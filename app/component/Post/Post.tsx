"use client"

import PostBox from "./PostBox"
import PostView from "./PostView"

export default function Post() {
    return (
        <div className="w-2/3 p-5 flex flex-col items-center justify-center gap-3">
            <PostBox />
            <PostView props={{Name:"test",Avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCrrm5NHoVqE0ZFvqbFdZJaPZ2j08LtCrPHA&s",TypeofAccess:"public",TypeofPost:"store",message:"hi iam proplayer",date:Date.now()}}></PostView>
        </div>
    )
}