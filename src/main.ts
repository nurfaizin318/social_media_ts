import {server} from "./application/web";
import {logger} from "./application/logging";

server.listen(3000, () => {
    logger.info("Listening on port 3000");
})
