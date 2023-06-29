package de.teamprojectfinance.backend;

public enum PostingCategory {

    INCOME("Posting category is income"),
    EXPENSES("Posting category is expenses");

    private final String message;

    private PostingCategory(String message){
        this.message = message;
    }

    public String getMessage(){
        return message;
    }
}
