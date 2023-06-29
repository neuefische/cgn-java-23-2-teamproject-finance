package de.teamprojectfinance.backend;

import org.springframework.stereotype.Service;

@Service
public class PostingService {

    private final PostingRepo postingRepo;

    private final RandomId randomId;

    public PostingService(PostingRepo postingRepo, RandomId randomId){
        this.postingRepo = postingRepo;
        this.randomId = randomId;
    }

    public PostingModel addPosting(PostingModel postingModel) {
        postingModel.setId(randomId.createRandomId());
        return postingRepo.addPosting(postingModel);
    }


}
