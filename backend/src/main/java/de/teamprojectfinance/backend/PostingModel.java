package de.teamprojectfinance.backend;

import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;

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

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public PostingCategory getCategory() {
        return category;
    }

    public void setCategory(PostingCategory category) {
        this.category = category;
    }
}
