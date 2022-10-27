export class NotificationMessages {
    static readonly ApiError = {
        Message: "Web API is not available. Please try again later.",
        Title: "Error"
    }

    static readonly GenericError = {
        Message: "An error has occured while processing your request.",
        Title: "Error"
    }

    static readonly SaveSuccessful = {
        Message: "The record has been saved.",
        Title: "Successful"
    };

    static readonly SaveError = {
        Message: "An error has occured while saving the record.",
        Title: "Error"
    }

    static readonly CancelSuccessful = {
        Message: "The record has been cancelled.",
        Title: "Successful"
    };

    static readonly DeleteSuccessful = {
        Message: "The record has been deleted.",
        Title: "Successful"
    };

    static readonly DeleteError = {
        Message: "An error has occured while deleting the record.",
        Title: "Error"
    }

    static readonly IncompleteRequiredDocumentsError = {
        Message: "Please complete all required document attachments",
        Title: "Error"
    };
}