package de.teamprojectfinance.backend;

import org.springframework.stereotype.Service;

@Service
public class PostingService {

    private final PostingRepo postingRepo;

    public PostingService(PostingRepo postingRepo){
        this.postingRepo = postingRepo;
    }

    public PostingModel addPosting(PostingModel postingModel) {
        postingModel.setId(RandomId.createRandomId());
        return postingRepo.addPosting(postingModel);
    }


}
