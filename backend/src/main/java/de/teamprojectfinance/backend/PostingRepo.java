package de.teamprojectfinance.backend;


import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PostingRepo {

    private final List<PostingModel> postingModels;

    public PostingRepo(List<PostingModel> postingModels){
        this.postingModels = postingModels;
    }

    public PostingModel addPosting(PostingModel postingModel) {
        this.postingModels.add(postingModel);
        return postingModel;
    }
}
