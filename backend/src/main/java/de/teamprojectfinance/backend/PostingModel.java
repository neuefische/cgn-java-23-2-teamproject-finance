package de.teamprojectfinance.backend;

import java.util.Objects;


public class PostingModel {

        private String id;

        private String description;

        private int amount;

        private PostingCategory category;

        public PostingModel(String description, int amount){
            this.id = null;
            this.description = description;
            this.amount = amount;

        }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PostingModel that = (PostingModel) o;
        return getAmount() == that.getAmount() && Objects.equals(getId(), that.getId()) && Objects.equals(getDescription(), that.getDescription());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getDescription(), getAmount());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public int getAmount() {
        return amount;
    }



}
