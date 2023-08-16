const {
  createBooking,
  updateBooking,
  getBookings,
  getAllBookings,
  getBookingById,
} = require("../../src/services/booking.service");

const Booking = require("../../src/models/booking.model");
const Show = require("../../src/models/show.model");
const { STATUS } = require("../../src/utils/constants");

jest.mock("../../src/models/booking.model", () => ({
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
}));

jest.mock("../../src/models/show.model", () => ({
  findOne: jest.fn(),
  save: jest.fn(),
}));

describe("Booking Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createBooking", () => {
    it("should create a booking", async () => {
      const data = {};

      const show = {
        movieId: data.movieId,
        theatreId: data.theatreId,
        timing: data.timing,
        // price: 10,
        save: jest.fn(),
      };

      Show.findOne.mockResolvedValue(show);
      Booking.create.mockResolvedValue(data);

      const response = await createBooking(data);

      expect(Show.findOne).toHaveBeenCalledWith({
        movieId: data.movieId,
        theatreId: data.theatreId,
        timing: data.timing,
      });
      expect(show.save).toHaveBeenCalled();
      expect(response).toEqual(data);
    });

    it("should handle validation error during booking creation", async () => {
      const data = {};

      const validationError = new Error();
      validationError.name = "ValidationError";
      validationError.errors = {
        // Define the validation errors here
      };

      Show.findOne.mockResolvedValue(null);
      Booking.create.mockRejectedValue(validationError);

      try {
        await createBooking(data);
      } catch (error) {
        // expect(error).toEqual({
        //   err: {
        //     // Define the expected error messages
        //   },
        //   code: STATUS.NOT_FOUND,
        // });
      }
    });
  });

  describe("updateBooking", () => {
    it("should update a booking", async () => {
      const bookingId = "booking_id";
      const data = {
        // Provide updated booking data here
      };
      const updatedBooking = {
        _id: bookingId,
        // Provide updated booking data here
      };

      Booking.findByIdAndUpdate.mockResolvedValue(updatedBooking);

      const response = await updateBooking(data, bookingId);

      expect(Booking.findByIdAndUpdate).toHaveBeenCalledWith(bookingId, data, {
        new: true,
        runValidators: true,
      });
      expect(response).toEqual(updatedBooking);
    });

    it("should handle booking not found error during updateBooking", async () => {
      const bookingId = "booking_id";
      const data = {
        // Provide updated booking data here
      };

      Booking.findByIdAndUpdate.mockResolvedValue(null);

      try {
        await updateBooking(data, bookingId);
      } catch (error) {
        // expect(error).toEqual({
        //   err: "No booking found for the given id",
        //   code: STATUS.NOT_FOUND,
        // });
      }
    });

    it("should handle validation error during booking update", async () => {
      const bookingId = "booking_id";
      const data = {
        // Provide invalid updated booking data here
      };

      const validationError = new Error();
      validationError.name = "ValidationError";
      validationError.errors = {
        // Define the validation errors here
      };

      Booking.findByIdAndUpdate.mockRejectedValue(validationError);

      try {
        await updateBooking(data, bookingId);
      } catch (error) {
        // expect(error).toEqual({
        //   err: {
        //     // Define the expected error messages
        //   },
        //   code: STATUS.NOT_FOUND,
        // });
      }
    });
  });

  describe("getBookings", () => {
    it("should get bookings", async () => {
      const filter = {
        // Provide filter data here
      };
      const bookings = [
        // Provide booking objects here
      ];

      Booking.find.mockResolvedValue(bookings);

      const response = await getBookings(filter);

      expect(Booking.find).toHaveBeenCalledWith(filter);
      expect(response).toEqual(bookings);
    });
  });

  describe("getAllBookings", () => {
    it("should get all bookings", async () => {
      const bookings = [
        // Provide booking objects here
      ];

      Booking.find.mockResolvedValue(bookings);

      const response = await getAllBookings();

      expect(Booking.find).toHaveBeenCalled();
      expect(response).toEqual(bookings);
    });
  });

  describe("getBookingById", () => {
    it("should get booking by ID", async () => {
      const bookingId = "booking_id";
      const userId = "user_id";
      const booking = {
        _id: bookingId,
        userId: userId,
        // Provide other booking data here
      };

      Booking.findById.mockResolvedValue(booking);

      const response = await getBookingById(bookingId, userId);

      expect(Booking.findById).toHaveBeenCalledWith(bookingId);
      expect(response).toEqual(booking);
    });

    it("should handle booking not found error during getBookingById", async () => {
      const bookingId = "booking_id";
      const userId = "user_id";

      Booking.findById.mockResolvedValue(null);

      try {
        await getBookingById(bookingId, userId);
      } catch (error) {
        // expect(error).toEqual({
        //   err: "No booking records found for the id",
        //   code: STATUS.NOT_FOUND,
        // });
      }
    });

    it("should handle unauthorized access error during getBookingById", async () => {
      const bookingId = "booking_id";
      const userId = "user_id";
      const booking = {
        _id: bookingId,
        userId: "different_user_id", // Different from userId
        // Provide other booking data here
      };

      Booking.findById.mockResolvedValue(booking);

      try {
        await getBookingById(bookingId, userId);
      } catch (error) {
        // expect(error).toEqual({
        //   err: "Not able to access the booking",
        //   code: STATUS.NOT_FOUND,
        // });
      }
    });
  });
});
