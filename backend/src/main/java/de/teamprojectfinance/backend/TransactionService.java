package de.teamprojectfinance.backend;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepo postingRepo;

    private final IdService idService;

    public TransactionService(TransactionRepo postingRepo, IdService idService){
        this.postingRepo = postingRepo;
        this.idService = idService;
    }

    public Transaction addPosting(DtoTransaction newPostingModel) {
        return postingRepo.addPosting(new Transaction(idService.createRandomId(),newPostingModel.getDescription(), newPostingModel.getAmount(), newPostingModel.getCategory()));
    }


    public List<Transaction> getAllPostings() {
        return postingRepo.getAllPostings();
    }
}
