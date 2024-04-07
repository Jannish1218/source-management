// JavaScript source code
document.addEventListener("DOMContentLoaded", function () {
    const addSubscriptionForm = document.getElementById("addSubscriptionForm");
    const subscriptionsBody = document.getElementById("subscriptionsBody");

    // Load subscriptions from local storage
    loadSubscriptions();

    // Add subscription event
    addSubscriptionForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addSubscription();
    });

    // Function to add new subscription
    function addSubscription() {
        const customerName = document.getElementById("customerName").value;
        const customerID = document.getElementById("customerID").value;
        const amount = document.getElementById("amount").value;
        const subscriptionType = document.getElementById("subscriptionType").value;
        const dueDate = document.getElementById("dueDate").value;

        // Create subscription object
        const subscription = {
            customerName,
            customerID,
            amount,
            subscriptionType,
            dueDate
        };

        // Save to local storage
        let subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];
        subscriptions.push(subscription);
        localStorage.setItem("subscriptions", JSON.stringify(subscriptions));

        // Reload subscriptions table
        loadSubscriptions();

        // Clear form fields
        addSubscriptionForm.reset();
    }

    // Function to load subscriptions from local storage
    function loadSubscriptions() {
        subscriptionsBody.innerHTML = "";
        const subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];
        subscriptions.forEach((subscription, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${subscription.customerName}</td>
                <td>${subscription.customerID}</td>
                <td>${subscription.amount}</td>
                <td>${subscription.subscriptionType}</td>
                <td>${subscription.dueDate}</td>
                <td class="actions">
                    <button onclick="editSubscription(${index})">Edit</button>
                    <button onclick="deleteSubscription(${index})">Delete</button>
                </td>
            `;
            subscriptionsBody.appendChild(tr);
        });
    }

    // Function to edit subscription
    window.editSubscription = function (index) {
        const subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];
        const subscription = subscriptions[index];
        document.getElementById("customerName").value = subscription.customerName;
        document.getElementById("customerID").value = subscription.customerID;
        document.getElementById("amount").value = subscription.amount;
        document.getElementById("subscriptionType").value = subscription.subscriptionType;
        document.getElementById("dueDate").value = subscription.dueDate;

        // Remove the subscription from local storage
        subscriptions.splice(index, 1);
        localStorage.setItem("subscriptions", JSON.stringify(subscriptions));

        // Reload subscriptions table
        loadSubscriptions();
    }

    // Function to delete subscription
    window.deleteSubscription = function (index) {
        const subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];
        subscriptions.splice(index, 1);
        localStorage.setItem("subscriptions", JSON.stringify(subscriptions));

        // Reload subscriptions table
        loadSubscriptions();
    }
});
