import {Posting} from "../model/model.ts";
import PostingCard from "../PostingCard/PostingCard.tsx";

type Props={
    postings: Posting[]
}

export default function PostingCollection(props: Props){
    return(
        <>
            <h2>Buchungsliste</h2>
            {
                props.postings.map((post, )=><PostingCard posting={post} key={post.description}/>)
            }
        </>
    )
}