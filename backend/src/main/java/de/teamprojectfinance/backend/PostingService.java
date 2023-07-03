package de.teamprojectfinance.backend;

import org.springframework.stereotype.Service;

@Service
public class PostingService {

    private final PostingRepo postingRepo;

    private final IdService idService;

    public PostingService(PostingRepo postingRepo, IdService idService){
        this.postingRepo = postingRepo;
        this.idService = idService;
    }

    public PostingModel addPosting(NewPostingModel newPostingModel) {
        return postingRepo.addPosting(new PostingModel(idService.createRandomId(),newPostingModel.getDescription(), newPostingModel.getAmount(), newPostingModel.getCategory()));
    }


}
