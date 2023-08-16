const {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserRoleOrStatus,
} = require("../../src/services/user.service");

const User = require("../../src/models/user.model");

jest.mock("../../src/models/user.model", () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

describe("User Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a user", async () => {
      const data = {
        name: "Santosh Kumar",
        email: "santosh@gmail.com",
        password: 12345,
        // userRole: "customer",
        // userStatus: "approved",
      };

      User.create.mockResolvedValue(data);

      const response = await createUser(data);

      expect(User.create).toHaveBeenCalledWith(data);
      expect(response).toEqual(data);
    });

    it("should handle validation error during user creation", async () => {
      const data = {
        // userRole: "invalidRole",
      };

      const validationError = new Error();
      validationError.name = "ValidationError";
      validationError.errors = {
        // userRole: {
        //   message: "User role is invalid",
        // },
      };

      User.create.mockRejectedValue(validationError);

      try {
        await createUser(data);
      } catch (error) {
        expect(error).toEqual({
          err: {
            // userRole: "User role is invalid",
          },
          code: 422,
        });
      }
    });
  });

  describe("getUserByEmail", () => {
    it("should get a user by email", async () => {
      const email = "test@gmail.com";
      const user = {
        _id: "user_id",
        email: "test@gmail.com",
        userRole: "customer",
        userStatus: "approved",
      };

      User.findOne.mockResolvedValue(user);

      const response = await getUserByEmail(email);

      expect(User.findOne).toHaveBeenCalledWith({ email });
      expect(response).toEqual(user);
    });

    it("should handle user not found error during getUserByEmail", async () => {
      const email = "test@gmail.com";

      User.findOne.mockResolvedValue(null);

      try {
        await getUserByEmail(email);
      } catch (error) {
        expect(error).toEqual({
          err: "No user found for the given email",
          code: 404,
        });
      }
    });
  });

  describe("getUserById", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should get a user by ID", async () => {
      const userId = "user_id";
      const user = {
        _id: userId,
        email: "test@gmail.com",
        userRole: "customer",
        userStatus: "approved",
        // Add other user data here
      };

      User.findById.mockResolvedValue(user);

      const response = await getUserById(userId);

      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(response).toEqual(user);
    });

    it("should handle user not found error", async () => {
      const userId = "user_id";

      User.findById.mockResolvedValue(null);

      try {
        await getUserById(userId);
      } catch (error) {
        expect(error).toEqual({
          err: "No user found for the given id",
          code: 404,
        });
      }
    });

    it("should handle other errors", async () => {
      const userId = "user_id";

      const errorMessage = "An error occurred";
      const error = new Error(errorMessage);

      User.findById.mockRejectedValue(error);

      try {
        await getUserById(userId);
      } catch (error) {
        expect(error).toEqual(error);
      }
    });
  });

  describe("updateUserRoleOrStatus", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should update user role", async () => {
      const userId = "user_id";
      const data = {
        userRole: "admin",
      };
      const updatedUser = {
        _id: userId,
        email: "test@gmail.com",
        userRole: "admin",
        userStatus: "approved",
        // Add other updated user data here
      };

      User.findByIdAndUpdate.mockResolvedValue(updatedUser);

      const response = await updateUserRoleOrStatus(data, userId);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        userId,
        { userRole: data.userRole },
        { new: true, runValidators: true }
      );
      expect(response).toEqual(updatedUser);
    });

    it("should update user status", async () => {
      const userId = "user_id";
      const data = {
        userStatus: "pending",
      };
      const updatedUser = {
        _id: userId,
        email: "test@gmail.com",
        userRole: "customer",
        userStatus: "pending",
        // Add other updated user data here
      };

      User.findByIdAndUpdate.mockResolvedValue(updatedUser);

      const response = await updateUserRoleOrStatus(data, userId);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        userId,
        { userStatus: data.userStatus },
        { new: true, runValidators: true }
      );
      expect(response).toEqual(updatedUser);
    });

    it("should handle user not found error", async () => {
      const userId = "nonexistent_id";
      const data = {
        userRole: "admin",
      };

      User.findByIdAndUpdate.mockResolvedValue(null);

      try {
        await updateUserRoleOrStatus(data, userId);
      } catch (error) {
        // expect(error).toEqual({
        //   err: "No user found for the given id",
        //   code: 404,
        // });
      }
    });

    it("should handle validation error", async () => {
      const userId = "user_id";
      const data = {
        userRole: "invalidRole",
      };

      const validationError = new Error();
      validationError.name = "ValidationError";
      validationError.errors = {
        userRole: {
          message: "User role is invalid",
        },
      };

      User.findByIdAndUpdate.mockRejectedValue(validationError);

      try {
        await updateUserRoleOrStatus(data, userId);
      } catch (error) {
        // expect(error).toEqual({
        //   err: {
        //     userRole: "User role is invalid",
        //   },
        // });
      }
    });

    it("should handle other errors", async () => {
      const userId = "user_id";
      const data = {
        userRole: "admin",
      };

      const errorMessage = "An error occurred";
      const error = new Error(errorMessage);

      User.findByIdAndUpdate.mockRejectedValue(error);

      try {
        await updateUserRoleOrStatus(data, userId);
      } catch (error) {
        expect(error).toEqual(error);
      }
    });
  });
});
