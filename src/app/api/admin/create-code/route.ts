import { createResponse } from "@/lib/middleware/error";
import { verifyTkn } from "@/lib/middleware/verifyToken";
import InviteCode from "@/models/InviteCode";
import { NextRequest, NextResponse } from "next/server";

interface CustomReq extends NextRequest{
    admin?:any;
}

export async function POST(req:CustomReq){
    const auth = await verifyTkn(req);
    if(auth instanceof NextResponse){
        return auth;
    }

    try {

        const isMain = req.admin.isMain;
        if(isMain === false){
            return createResponse('you are not authenticate',false,401)
        }

        const body =await req.json();
        const code = body.code;
        if(!code){
            return createResponse('Provide a valid code',false,400)
        }

        const invitecode = new InviteCode({
            code
        });

        await invitecode.save();

        return createResponse('Generated code is',true,201,invitecode)
    } catch (error:any) {
        console.error(error.message);
        return createResponse(`Error:${error.message}`,true,500,[]);
    }
}