function vnd(value) {
  return value.toLocaleString('vi-VN') + ' VNĐ';
}

function calculate() {
  const revenue = Number(document.getElementById('revenue').value) || 0;
  const cogsRate = (Number(document.getElementById('cogs').value) || 0) / 100;
  const opex = Number(document.getElementById('opex').value) || 0;
  const initialFee = Number(document.getElementById('initialFee').value) || 0;
  const discountRate = (Number(document.getElementById('discountRate').value) || 0) / 100;

  const grossProfit = revenue * (1 - cogsRate);
  const discountValue = revenue * discountRate;
  const netProfit = grossProfit + discountValue - opex;
  const paybackMonths = netProfit > 0 ? initialFee / netProfit : Infinity;

  document.getElementById('grossProfit').textContent = vnd(Math.round(grossProfit));
  document.getElementById('discountValue').textContent = vnd(Math.round(discountValue));
  document.getElementById('netProfit').textContent = vnd(Math.round(netProfit));
  document.getElementById('payback').textContent = Number.isFinite(paybackMonths)
    ? `${paybackMonths.toFixed(1)} tháng`
    : 'Không thể hoàn vốn (lợi nhuận ròng <= 0)';
}

document.getElementById('calcBtn').addEventListener('click', calculate);
calculate();
