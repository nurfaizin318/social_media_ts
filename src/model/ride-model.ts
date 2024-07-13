import { Orders } from "@prisma/client"

export type RideTypeRequest = {
    distance: string,
    location: string,
    destination : string
}

export type OrderRequest = {
    from: string,
    destination: string,
    distance: number,
    driver_id: number,
    user_id: number,
    rideType_id: number,
}

