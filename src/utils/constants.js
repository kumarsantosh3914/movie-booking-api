const USER_STATUS = {
    approved: "APPROVED",
    pending: "PENDING",
    rejected: "REJECTED",
};

const USER_ROLES = {
    customer: "CUSTOMER",
    admin: "ADMIN",
    client: "CLIENT"
}

const BOOKING_STATUS = {
    cancelled: "CANCELLED",
    successfull: "SUCCESSFULL",
    processing: "IN_PROCESS",
    expired: "EXPIRED"
}

const PAYMENT_STATUS = {
    failed: "FAILED",
    success: "SUCCESS",
    pending: "PENDING"
}

module.exports = {
    USER_STATUS,
    USER_ROLES,
    BOOKING_STATUS,
    PAYMENT_STATUS,
}
