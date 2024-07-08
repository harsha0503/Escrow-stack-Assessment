let users = [];
let subscribedStocks = {};
let supportedStocks = ['GOOG', 'TSLA', 'AMZN', 'META', 'NVDA'];
let currentUser = null;

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    currentUser = email;

    if (!users.includes(email)) {
        users.push(email);
        subscribedStocks[email] = [];
    }

    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard-screen').style.display = 'block';
    document.getElementById('user-info').innerText = `Logged in as:  ${email}`; 


    updateSubscribedStocks();
    startPriceUpdates();
});

function subscribeToStock(stock) {
    if (!subscribedStocks[currentUser].includes(stock)) {
        subscribedStocks[currentUser].push(stock);
        updateSubscribedStocks();
    }
}

function updateSubscribedStocks() {
    const stockList = document.getElementById('stocks-list');
    stockList.innerHTML = '';
    subscribedStocks[currentUser].forEach(stock => {
        const li = document.createElement('li');
        li.id =`stock-${stock}`;
        li.innerText = `${stock}: 0.00`;
        stockList.appendChild(li);
    });
}

function startPriceUpdates() {
    setInterval(() => {
        supportedStocks.forEach(stock => {
            const price = (Math.random() * 1000).toFixed(2);
            users.forEach(user => {
                if (subscribedStocks[user].includes(stock)) {
                    const stockItem = document.getElementById(`stock- ${stock}`);
                    if (stockItem) {
                        stockItem.innerText = `${stock}: $${price}`;
                    }
                }
            });
        });
    }, 1000);
}
