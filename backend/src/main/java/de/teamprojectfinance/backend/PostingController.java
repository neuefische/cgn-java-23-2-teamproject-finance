package de.teamprojectfinance.backend;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/finance/")
public class PostingController {

    private final PostingService postingService;

    PostingController(PostingService postingService) {
        this.postingService = postingService;
    }

    @GetMapping
    List<PostingModel> getAllPostings(){
        return postingService.getAllPostings();
    }


    @PostMapping
    public PostingModel addPosting(@RequestBody NewPostingModel newPostingModel) {
        return postingService.addPosting(newPostingModel);
    }
}
