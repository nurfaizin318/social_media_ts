import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { PostController } from "../controller/post-controller";
import FileUploader from "../helper/multer";
import { FriendshipController } from "../controller/friendship-controller";
import { LikeController } from "../controller/like-controller";
import { UserController } from "../controller/user-controller";
import { CommenController } from "../controller/comment-controller";
import { MessageController } from "../controller/message-controller";



export const apiRouter = express.Router();
const fileUploader = new FileUploader();
apiRouter.use(authMiddleware);



apiRouter.post("/api/post", fileUploader.single('image'), PostController.store);
apiRouter.post("/api/post/update", fileUploader.single('image'), PostController.update);
apiRouter.delete("/api/post/:id", PostController.destroy);


apiRouter.get("/api/friendship/:id", FriendshipController.index);
apiRouter.post("/api/friendship", FriendshipController.store);
apiRouter.get("/api/friendship/friend/:id", FriendshipController.friendList);
apiRouter.patch("/api/friendship/:id", FriendshipController.update);
apiRouter.delete("/api/friendship/:id", FriendshipController.destroy);

apiRouter.post("/api/like", LikeController.store);
apiRouter.get("/api/like/:id", LikeController.index);
apiRouter.post("/api/like/delete", LikeController.destroy);


apiRouter.get("/api/comment/:id", CommenController.index);
apiRouter.post("/api/comment", CommenController.store);
apiRouter.patch("/api/comment", CommenController.update);
apiRouter.delete("/api/comment/:id", CommenController.destroy);

apiRouter.get("/api/message/:id", MessageController.index);

apiRouter.post("/api/message/detail", MessageController.show);
apiRouter.post("/api/message", MessageController.store);
apiRouter.patch("/api/message", MessageController.update);
apiRouter.delete("/api/message/:id", MessageController.destroy);

apiRouter.get("/api/summary/:id", UserController.summary);