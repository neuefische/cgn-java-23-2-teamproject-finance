package de.teamprojectfinance.backend;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/finance/")
public class PostingController {

    private final PostingService postingService;

     PostingController(PostingService postingService){
         this.postingService = postingService;
     }

    @PostMapping
    public PostingModel addPosting(@RequestBody PostingModel postingModel){
         return postingService.addPosting(postingModel);
    }
}
