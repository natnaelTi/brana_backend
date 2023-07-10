export async function AdminRestricted(req, res, next) {
	if (req.user.dataValues.type == 1) {
		next();
	} else {
		return res.status(401).json({
			message: "UNAUTHORIZED",
			error: "Admin privileges needed to access this route",
		});
	}
}
// export async function UserCreateRestricted(req, res, next) {
// 	if (
// 		req.user.dataValues.type == 1 ||
// 		req.body.user_id == req.user.dataValues.id
// 	) {
// 		next();
// 	} else {
// 		return res.status(401).json({
// 			message: "UNAUTHORIZED",
// 			error: "User cannot create a resource for another user!",
// 		});
// 	}
// }
