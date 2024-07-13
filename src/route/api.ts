import express from "express";
import { DashboardController } from "../controller/dashboard-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import { MapController } from "../controller/map-controller";
import { RideController } from "../controller/ride-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);


// Dashboard Api
apiRouter.get("/api/dashboard/menu", DashboardController.menu);
apiRouter.get("/api/dashboard/banner", DashboardController.banner);

apiRouter.post("/api/map/place", MapController.getPlace);
apiRouter.post("/api/ride/ride-type", RideController.getRideType);
apiRouter.post("/api/ride/order-ride", RideController.searchDriver);


// User APi
// apiRouter.get("/api/users/current", UserController.get);
// apiRouter.patch("/api/users/current", UserController.update);
// apiRouter.delete("/api/users/current", UserController.logout);

// Contact API
// apiRouter.post("/api/contacts", ContactController.create);
// apiRouter.get("/api/contacts/:contactId(\\d+)", ContactController.get);
// apiRouter.put("/api/contacts/:contactId(\\d+)", ContactController.update);
// apiRouter.delete("/api/contacts/:contactId(\\d+)", ContactController.remove);
// apiRouter.get("/api/contacts", ContactController.search);

// Address API
// apiRouter.post("/api/contacts/:contactId(\\d+)/addresses", AddressController.create);
// apiRouter.get("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)", AddressController.get);
// apiRouter.put("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)", AddressController.update);
// apiRouter.delete("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)", AddressController.remove);
// apiRouter.get("/api/contacts/:contactId(\\d+)/addresses", AddressController.list);
