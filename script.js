// Enterキーが押されたらcalculateNextPurchase関数を呼び出す
document.getElementById('currentPurchaseDate').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        calculateNextPurchase();
    }
});

function calculateNextPurchase() {
    const currentPurchaseDate = document.getElementById('currentPurchaseDate').value;
    const selectedItem = document.getElementById('itemSelect').value;

    const currentDate = new Date();
    const currentPurchase = new Date(currentPurchaseDate);

    if (isNaN(currentPurchase.getTime())) {
        const resultElement = document.getElementById('result');
        resultElement.textContent = `入力された日付が無効です。正しい形式で入力してください。`;
        return;
    }

    let lastPurchaseDate = localStorage.getItem(`lastPurchaseDate_${selectedItem}`);

    if (lastPurchaseDate) {
        const lastPurchase = new Date(lastPurchaseDate);

        const lastPurchaseDays = Math.floor((currentPurchase - lastPurchase) / (24 * 60 * 60 * 1000));

        const nextPurchaseDate = new Date(currentPurchase);
        nextPurchaseDate.setDate(currentPurchase.getDate() + lastPurchaseDays);

        const resultElement = document.getElementById('result');
        const formattedNextPurchaseDate = nextPurchaseDate.toLocaleDateString();
        resultElement.textContent = `次の購入予測日は ${formattedNextPurchaseDate} です。`;

        localStorage.setItem(`lastPurchaseDate_${selectedItem}`, currentPurchaseDate);
    } else {
        localStorage.setItem(`lastPurchaseDate_${selectedItem}`, currentPurchaseDate);
        const resultElement = document.getElementById('result');
        resultElement.textContent = `「${selectedItem}」の初回の購入です。`;
    }
}

function clearPurchaseHistory() {
    const selectedItem = document.getElementById('itemSelect').value;
    localStorage.removeItem(`lastPurchaseDate_${selectedItem}`);

    const resultElement = document.getElementById('result');
    resultElement.textContent = `「${selectedItem}」の購入履歴をクリアしました。`;
}
