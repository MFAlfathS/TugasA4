function hitungVoucher() {
    const voucher = document.getElementById("voucher").value;
    const totalBelanja = parseFloat(document.getElementById("totalBelanja").value);
    let diskonPersen, minimalBelanja, maksimalDiskon;

    if (voucher === "DumbWaysJos") {
        diskonPersen = 21.1 / 100;
        minimalBelanja = 50000;
        maksimalDiskon = 20000;
    } else if (voucher === "DumbWaysMantap") {
        diskonPersen = 30 / 100;
        minimalBelanja = 80000;
        maksimalDiskon = 40000;
    } else {
        document.getElementById("hasil").innerText = "Voucher tidak valid";
        return;
    }

    if (totalBelanja < minimalBelanja) {
        document.getElementById("hasil").innerText = "Belanja tidak memenuhi syarat minimal untuk voucher ini";
        return;
    }

    let diskon = totalBelanja * diskonPersen;
    if (diskon > maksimalDiskon) {
        diskon = maksimalDiskon;
    }

    const totalBayar = totalBelanja - diskon;

    document.getElementById("hasil").innerText = `Uang yang harus dibayar: ${totalBayar}\nDiskon: ${diskon}`;
}