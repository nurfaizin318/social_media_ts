
import {prismaClient} from "../application/database";
import { RegisterRequest } from "../model/user-model";


export class UserRepository {

    static userIsExsist = async (req: RegisterRequest): Promise<boolean> => {

      var total: number = await   prismaClient.user.count({
            where: {
                phone_number : req.phone_number
            }
        });

        if(total > 0){
                return true
        } else {
            return false
        }
    }

  
}