package de.teamprojectfinance.backend;


import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TransactionRepo {

    private final List<Transaction> postingModels;

    public TransactionRepo(List<Transaction> postingModels){
        this.postingModels = postingModels;
    }

    public Transaction addPosting(Transaction postingModel) {
        this.postingModels.add(postingModel);
        return postingModel;
    }

    public List<Transaction> getAllTransactions() {
        return postingModels;
    }
}
