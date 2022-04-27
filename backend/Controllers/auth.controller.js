const { authService } = require("../Services/index");
const Validate = require("../Helper/validate");
const catchAsync = require("../Utils/catchAsync");
const httpStatus = require("http-status");

const authLogIn = catchAsync(async(req, res) => {
    try {
        const userLogin = await authService.authLogService(req.body, res);
        if (userLogin) {
            res.json({
                code: httpStatus.CREATED,
                message: Validate.logg
            });
            res.send(userLogin)
        }
        
    } catch (error) {
        res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
            code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message ||'internal server error'
          })
    }
});

const authAdminLogIn = catchAsync(async (req, res) => {
    try {
        const AdminLogIn = await authService.authAdminService(req.body, res);
        if (AdminLogIn) {
            res.json({
                code: httpStatus.CREATED,
                message: Validate.logg
            });
            res.send(AdminLogIn);
        }
    } catch (error) {
        res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
            code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message ||'internal server error'
          })
    }
})

module.exports = {
    authLogIn,
    authAdminLogIn
}