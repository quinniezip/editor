// ===== MOCK DATA 2026 =====

const MONTHS = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];

const REVENUE_2026 = [285, 312, 348, 295, 420, 388, 452, 410, 395, 465, 502, 548];
const REVENUE_2025 = [240, 265, 290, 255, 360, 330, 390, 355, 340, 400, 435, 475];

const PRODUCTS = [
  { id: 'SP001', name: 'iPhone 16 Pro Max',    category: 'Điện tử',  price: 32990000, stock: 45,  sold: 312, rating: 4.8 },
  { id: 'SP002', name: 'MacBook Pro M4',        category: 'Điện tử',  price: 54990000, stock: 23,  sold: 187, rating: 4.9 },
  { id: 'SP003', name: 'Áo Thun Premium',       category: 'Thời trang', price: 450000,  stock: 320, sold: 892, rating: 4.5 },
  { id: 'SP004', name: 'Nồi Cơm Điện Cao Cấp', category: 'Gia dụng', price: 2890000,  stock: 78,  sold: 456, rating: 4.6 },
  { id: 'SP005', name: 'Vitamin C 1000mg',      category: 'Sức khỏe', price: 320000,   stock: 540, sold: 1240, rating: 4.7 },
  { id: 'SP006', name: 'Samsung Galaxy S25',    category: 'Điện tử',  price: 24990000, stock: 67,  sold: 278, rating: 4.7 },
  { id: 'SP007', name: 'Quần Jeans Slim Fit',   category: 'Thời trang', price: 680000,  stock: 195, sold: 634, rating: 4.4 },
  { id: 'SP008', name: 'Máy Lọc Không Khí',     category: 'Gia dụng', price: 4500000,  stock: 34,  sold: 198, rating: 4.8 },
  { id: 'SP009', name: 'Mật Ong Nguyên Chất',   category: 'Thực phẩm', price: 280000,  stock: 420, sold: 876, rating: 4.6 },
  { id: 'SP010', name: 'Tai Nghe Sony WH-1000', category: 'Điện tử',  price: 8990000,  stock: 56,  sold: 345, rating: 4.7 },
];

const SEGMENTS = ['VIP', 'Thân thiết', 'Mới', 'Tiềm năng'];
const PROVINCES = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng', 'Huế', 'Nha Trang', 'Vũng Tàu', 'Bình Dương', 'Đồng Nai'];
const PAYMENT_METHODS = ['Ví MoMo', 'Thẻ Visa', 'Thẻ ATM', 'ZaloPay', 'Tiền mặt', 'VNPay'];
const STATUS_LIST = ['Hoàn thành', 'Đang giao', 'Chờ xử lý', 'Đã hủy'];
const STATUS_WEIGHTS = [0.62, 0.22, 0.11, 0.05];

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pickWeighted(arr, weights) {
  const r = Math.random();
  let cum = 0;
  for (let i = 0; i < arr.length; i++) { cum += weights[i]; if (r < cum) return arr[i]; }
  return arr[arr.length - 1];
}
function pick(arr) { return arr[rand(0, arr.length - 1)]; }
function fmtCurrency(n) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + ' tỷ';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(0) + ' triệu';
  return n.toLocaleString('vi-VN') + 'đ';
}
function fmtFullCurrency(n) { return n.toLocaleString('vi-VN') + 'đ'; }

// Generate customers
const FIRST_NAMES = ['Nguyễn','Trần','Lê','Phạm','Hoàng','Huỳnh','Phan','Vũ','Đặng','Bùi','Đỗ','Hồ','Ngô','Dương','Lý'];
const MID_NAMES = ['Văn','Thị','Hữu','Đức','Minh','Thu','Thúy','Thanh','Quang','Kim'];
const LAST_NAMES = ['An','Bình','Cường','Dũng','Em','Hà','Hùng','Khánh','Lan','Linh','Mai','Nam','Nga','Phúc','Quân','Sơn','Tâm','Thắng','Tú','Uyên','Vân','Xuân','Yến'];

function genName() { return `${pick(FIRST_NAMES)} ${pick(MID_NAMES)} ${pick(LAST_NAMES)}`; }
function genEmail(name) {
  const n = name.toLowerCase().replace(/[^a-z]/g, '').replace(/\s+/g,'') + rand(10,99);
  return `${n}@${pick(['gmail.com','yahoo.com','outlook.com','hotmail.com'])}`;
}
function genPhone() { return '0' + pick(['3','7','8','9']) + Array.from({length:8}, ()=>rand(0,9)).join(''); }
function genDate(startY=1, endY=12) {
  const m = rand(startY, endY);
  const d = rand(1, 28);
  return `2026-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

const CUSTOMERS = Array.from({length: 80}, (_, i) => {
  const name = genName();
  const seg = pickWeighted(SEGMENTS, [0.12, 0.28, 0.35, 0.25]);
  const totalOrders = seg === 'VIP' ? rand(20,50) : seg === 'Thân thiết' ? rand(8,20) : seg === 'Mới' ? rand(1,5) : rand(3,12);
  const totalSpent = seg === 'VIP' ? rand(50,500) * 1_000_000 : seg === 'Thân thiết' ? rand(10,50) * 1_000_000 : seg === 'Mới' ? rand(1,10) * 1_000_000 : rand(5,30) * 1_000_000;
  return {
    id: `KH${String(i+1).padStart(4,'0')}`,
    name,
    email: genEmail(name),
    phone: genPhone(),
    province: pick(PROVINCES),
    segment: seg,
    totalOrders,
    totalSpent,
    lastOrder: genDate(1, 3),
    joinDate: `202${rand(3,5)}-${String(rand(1,12)).padStart(2,'0')}-${String(rand(1,28)).padStart(2,'0')}`,
  };
});

// Generate orders
let orderCounter = 1;
const ORDERS = [];
CUSTOMERS.forEach(cust => {
  const count = Math.min(cust.totalOrders, rand(1, 8));
  for (let j = 0; j < count; j++) {
    const product = pick(PRODUCTS);
    const qty = rand(1, 5);
    const status = pickWeighted(STATUS_LIST, STATUS_WEIGHTS);
    const month = rand(1, 3);
    ORDERS.push({
      id: `DH${String(orderCounter++).padStart(5,'0')}`,
      customerId: cust.id,
      customerName: cust.name,
      product: product.name,
      productId: product.id,
      qty,
      date: genDate(month, month),
      value: product.price * qty,
      payment: pick(PAYMENT_METHODS),
      status,
    });
  }
});
// Shuffle orders
ORDERS.sort(() => Math.random() - 0.5);

// ===== COMPUTED STATS =====
const totalRevenue = ORDERS.filter(o => o.status === 'Hoàn thành').reduce((s, o) => s + o.value, 0);
const totalOrders = ORDERS.length;
const totalCustomers = CUSTOMERS.length;
const avgOrderValue = Math.round(totalRevenue / ORDERS.filter(o=>o.status==='Hoàn thành').length);

// ===== CHART INSTANCES =====
let revenueChart, segmentChart, productChart, orderStatusChart, compareChart, paymentChart, newVsReturnChart;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  updateKPIs();
  renderRecentOrders();
  renderCustomersTable();
  renderOrdersTable();
  renderProductsTable();
  initCharts();
  bindEvents();
  showToast('Chào mừng! Dữ liệu 2026 đã được tải.', 'success');
});

function updateKPIs() {
  animateCount('kpiCustomers', totalCustomers, '', '');
  animateCount('kpiOrders', totalOrders, '', '');
  animateCount('kpiRevenue', Math.round(totalRevenue / 1_000_000), '', ' triệu đ');
  animateCount('kpiAvg', Math.round(avgOrderValue / 1_000), '', 'K đ');
}

function animateCount(id, target, prefix, suffix) {
  const el = document.getElementById(id);
  const start = 0;
  const duration = 1200;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = prefix + Math.floor(eased * target).toLocaleString('vi-VN') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ===== CHARTS =====
function initCharts() {
  initRevenueChart('line');
  initSegmentChart();
  initProductChart();
  initOrderStatusChart();
  initCompareChart();
  initPaymentChart();
  initNewVsReturnChart();
}

const CHART_COLORS = ['#4f46e5','#10b981','#f59e0b','#ef4444','#8b5cf6','#3b82f6','#06b6d4','#ec4899'];

function initRevenueChart(type) {
  const ctx = document.getElementById('revenueChart').getContext('2d');
  if (revenueChart) revenueChart.destroy();
  revenueChart = new Chart(ctx, {
    type,
    data: {
      labels: MONTHS,
      datasets: [{
        label: 'Doanh Thu (triệu đ)',
        data: REVENUE_2026,
        backgroundColor: type === 'bar' ? 'rgba(79,70,229,0.7)' : 'rgba(79,70,229,0.08)',
        borderColor: '#4f46e5',
        borderWidth: 2,
        fill: type === 'line',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#4f46e5',
      }]
    },
    options: chartOptions('Triệu đồng')
  });
}

function initSegmentChart() {
  const counts = SEGMENTS.map(s => CUSTOMERS.filter(c => c.segment === s).length);
  const ctx = document.getElementById('segmentChart').getContext('2d');
  segmentChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: SEGMENTS,
      datasets: [{ data: counts, backgroundColor: CHART_COLORS, borderWidth: 2, borderColor: '#fff' }]
    },
    options: {
      plugins: { legend: { display: false } },
      cutout: '65%',
      responsive: true,
      maintainAspectRatio: true,
    }
  });
  const legend = document.getElementById('segmentLegend');
  legend.innerHTML = SEGMENTS.map((s, i) => `
    <div class="legend-item">
      <div class="legend-dot" style="background:${CHART_COLORS[i]}"></div>
      <span>${s} (${counts[i]})</span>
    </div>`).join('');
}

function initProductChart() {
  const top5 = [...PRODUCTS].sort((a,b) => b.sold - a.sold).slice(0, 5);
  const ctx = document.getElementById('productChart').getContext('2d');
  productChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: top5.map(p => p.name.length > 18 ? p.name.slice(0,18)+'…' : p.name),
      datasets: [{
        label: 'Số lượng đã bán',
        data: top5.map(p => p.sold),
        backgroundColor: CHART_COLORS.slice(0,5),
        borderRadius: 6,
      }]
    },
    options: { ...chartOptions('Sản phẩm'), indexAxis: 'y', scales: { x: { grid: { display: false } }, y: { grid: { display: false } } } }
  });
}

function initOrderStatusChart() {
  const months = Array.from({length:12}, (_,i) => i+1);
  const completed = months.map(m => ORDERS.filter(o => new Date(o.date).getMonth()+1 === m && o.status === 'Hoàn thành').length);
  const shipping = months.map(m => ORDERS.filter(o => new Date(o.date).getMonth()+1 === m && o.status === 'Đang giao').length);
  const cancelled = months.map(m => ORDERS.filter(o => new Date(o.date).getMonth()+1 === m && o.status === 'Đã hủy').length);
  const ctx = document.getElementById('orderStatusChart').getContext('2d');
  orderStatusChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Hoàn thành', data: completed, backgroundColor: '#10b981', borderRadius: 4 },
        { label: 'Đang giao',  data: shipping,  backgroundColor: '#3b82f6', borderRadius: 4 },
        { label: 'Đã hủy',    data: cancelled, backgroundColor: '#ef4444', borderRadius: 4 },
      ]
    },
    options: { ...chartOptions('Đơn hàng'), scales: { x: { stacked: true, grid:{display:false} }, y: { stacked: true, grid:{color:'#f1f5f9'} } } }
  });
}

function initCompareChart() {
  const Q = ['Q1','Q2','Q3','Q4'];
  const sum = (arr, start, end) => arr.slice(start, end).reduce((a,b)=>a+b,0);
  const q2026 = [sum(REVENUE_2026,0,3), sum(REVENUE_2026,3,6), sum(REVENUE_2026,6,9), sum(REVENUE_2026,9,12)];
  const q2025 = [sum(REVENUE_2025,0,3), sum(REVENUE_2025,3,6), sum(REVENUE_2025,6,9), sum(REVENUE_2025,9,12)];
  const ctx = document.getElementById('compareChart').getContext('2d');
  compareChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Q,
      datasets: [
        { label: '2026', data: q2026, backgroundColor: '#4f46e5', borderRadius: 6 },
        { label: '2025', data: q2025, backgroundColor: '#cbd5e1', borderRadius: 6 },
      ]
    },
    options: chartOptions('Triệu đồng')
  });
}

function initPaymentChart() {
  const pmCounts = PAYMENT_METHODS.map(pm => ORDERS.filter(o => o.payment === pm).length);
  const ctx = document.getElementById('paymentChart').getContext('2d');
  paymentChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: PAYMENT_METHODS,
      datasets: [{ data: pmCounts, backgroundColor: CHART_COLORS, borderWidth: 2, borderColor: '#fff' }]
    },
    options: { plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } }, responsive: true, maintainAspectRatio: true }
  });
}

function initNewVsReturnChart() {
  const newCust = MONTHS.map((_,i) => rand(8, 25));
  const returning = MONTHS.map((_,i) => rand(18, 45));
  const ctx = document.getElementById('newVsReturnChart').getContext('2d');
  newVsReturnChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Khách hàng mới', data: newCust, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.08)', fill: true, tension: 0.4, pointRadius: 4 },
        { label: 'Khách hàng cũ',  data: returning, borderColor: '#4f46e5', backgroundColor: 'rgba(79,70,229,0.08)', fill: true, tension: 0.4, pointRadius: 4 },
      ]
    },
    options: chartOptions('Khách hàng')
  });
}

function chartOptions(yLabel) {
  return {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { labels: { boxWidth: 12, font: { size: 12 } } },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y?.toLocaleString('vi-VN') ?? ctx.parsed.x?.toLocaleString('vi-VN')}`
        }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 } } },
      y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 } } }
    }
  };
}

// ===== TABLES =====

// --- Recent Orders (dashboard) ---
function renderRecentOrders() {
  const recent = ORDERS.slice(0, 8);
  const tbody = document.getElementById('recentOrdersBody');
  tbody.innerHTML = recent.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.customerName}</td>
      <td>${o.product}</td>
      <td>${o.date}</td>
      <td>${fmtFullCurrency(o.value)}</td>
      <td>${statusBadge(o.status)}</td>
    </tr>`).join('');
}

// --- Customers Table ---
let customerPage = 1;
const CUST_PER_PAGE = 10;
let filteredCustomers = [...CUSTOMERS];
let custSortKey = null, custSortAsc = true;

function renderCustomersTable() {
  const search = (document.getElementById('customerSearch')?.value || '').toLowerCase();
  const seg = document.getElementById('customerSegmentFilter')?.value || '';
  filteredCustomers = CUSTOMERS.filter(c =>
    (!search || c.name.toLowerCase().includes(search) || c.email.toLowerCase().includes(search) || c.id.toLowerCase().includes(search)) &&
    (!seg || c.segment === seg)
  );
  if (custSortKey) {
    filteredCustomers.sort((a, b) => {
      let av = a[custSortKey], bv = b[custSortKey];
      if (typeof av === 'string') av = av.toLowerCase(), bv = bv.toLowerCase();
      return custSortAsc ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });
  }
  const total = filteredCustomers.length;
  const pages = Math.ceil(total / CUST_PER_PAGE);
  customerPage = Math.min(customerPage, pages || 1);
  const slice = filteredCustomers.slice((customerPage-1)*CUST_PER_PAGE, customerPage*CUST_PER_PAGE);
  document.getElementById('customersBody').innerHTML = slice.map(c => `
    <tr>
      <td><strong>${c.id}</strong></td>
      <td>${c.name}</td>
      <td style="color:var(--text-muted)">${c.email}</td>
      <td>${c.phone}</td>
      <td>${segmentBadge(c.segment)}</td>
      <td>${c.totalOrders}</td>
      <td>${fmtFullCurrency(c.totalSpent)}</td>
      <td>${c.lastOrder}</td>
      <td>
        <button class="action-btn" onclick="openCustomerDetail('${c.id}')">Chi tiết</button>
        <button class="action-btn danger" onclick="confirmDelete('${c.id}','customer')">Xóa</button>
      </td>
    </tr>`).join('');
  renderPagination('customerPagination', customerPage, pages, p => { customerPage = p; renderCustomersTable(); });
}

// --- Orders Table ---
let orderPage = 1;
const ORDERS_PER_PAGE = 10;
let filteredOrders = [...ORDERS];

function renderOrdersTable() {
  const search = (document.getElementById('orderSearch')?.value || '').toLowerCase();
  const status = document.getElementById('orderStatusFilter')?.value || '';
  const month = document.getElementById('orderMonthFilter')?.value || '';
  filteredOrders = ORDERS.filter(o =>
    (!search || o.id.toLowerCase().includes(search) || o.customerName.toLowerCase().includes(search) || o.product.toLowerCase().includes(search)) &&
    (!status || o.status === status) &&
    (!month || new Date(o.date).getMonth()+1 === parseInt(month))
  );
  const total = filteredOrders.length;
  const pages = Math.ceil(total / ORDERS_PER_PAGE);
  orderPage = Math.min(orderPage, pages || 1);
  const slice = filteredOrders.slice((orderPage-1)*ORDERS_PER_PAGE, orderPage*ORDERS_PER_PAGE);
  document.getElementById('ordersBody').innerHTML = slice.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.customerName}</td>
      <td>${o.product}</td>
      <td>${o.qty}</td>
      <td>${o.date}</td>
      <td>${fmtFullCurrency(o.value)}</td>
      <td>${o.payment}</td>
      <td>${statusBadge(o.status)}</td>
      <td>
        <button class="action-btn" onclick="openOrderDetail('${o.id}')">Chi tiết</button>
      </td>
    </tr>`).join('');
  renderPagination('orderPagination', orderPage, pages, p => { orderPage = p; renderOrdersTable(); });
}

// --- Products Table ---
function renderProductsTable() {
  const search = (document.getElementById('productSearch')?.value || '').toLowerCase();
  const cat = document.getElementById('productCategoryFilter')?.value || '';
  const filtered = PRODUCTS.filter(p =>
    (!search || p.name.toLowerCase().includes(p.name.toLowerCase()) || p.id.toLowerCase().includes(search) || p.name.toLowerCase().includes(search)) &&
    (!cat || p.category === cat)
  );
  document.getElementById('productsBody').innerHTML = filtered.map(p => `
    <tr>
      <td><strong>${p.id}</strong></td>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>${fmtFullCurrency(p.price)}</td>
      <td>
        <span style="color:${p.stock < 30 ? 'var(--danger)' : 'var(--success)'};font-weight:600">${p.stock}</span>
      </td>
      <td>${p.sold.toLocaleString('vi-VN')}</td>
      <td>${fmtCurrency(p.price * p.sold)}</td>
      <td><span class="stars">${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5-Math.round(p.rating))}</span> ${p.rating}</td>
    </tr>`).join('');
}

// ===== PAGINATION =====
function renderPagination(containerId, current, total, onClick) {
  const el = document.getElementById(containerId);
  if (total <= 1) { el.innerHTML = ''; return; }
  let html = `<span class="page-info">Trang ${current}/${total}</span>`;
  html += `<button class="page-btn" ${current===1?'disabled':''} onclick="(${onClick.toString()})(${current-1})">&#8592;</button>`;
  for (let p = Math.max(1, current-2); p <= Math.min(total, current+2); p++) {
    html += `<button class="page-btn ${p===current?'active':''}" onclick="(${onClick.toString()})(${p})">${p}</button>`;
  }
  html += `<button class="page-btn" ${current===total?'disabled':''} onclick="(${onClick.toString()})(${current+1})">&#8594;</button>`;
  el.innerHTML = html;
}

// ===== BADGES =====
function statusBadge(status) {
  const map = { 'Hoàn thành': 'badge-success', 'Đang giao': 'badge-info', 'Chờ xử lý': 'badge-warning', 'Đã hủy': 'badge-danger' };
  return `<span class="badge ${map[status] || 'badge-gray'}">${status}</span>`;
}
function segmentBadge(seg) {
  const map = { 'VIP': 'badge-purple', 'Thân thiết': 'badge-success', 'Mới': 'badge-info', 'Tiềm năng': 'badge-warning' };
  return `<span class="badge ${map[seg] || 'badge-gray'}">${seg}</span>`;
}

// ===== MODAL =====
function openCustomerDetail(id) {
  const c = CUSTOMERS.find(x => x.id === id);
  if (!c) return;
  const orders = ORDERS.filter(o => o.customerId === id);
  document.getElementById('modalTitle').textContent = `Chi Tiết Khách Hàng - ${c.id}`;
  document.getElementById('modalBody').innerHTML = `
    <div class="detail-grid">
      <div class="detail-item"><label>Họ tên</label><span>${c.name}</span></div>
      <div class="detail-item"><label>Email</label><span>${c.email}</span></div>
      <div class="detail-item"><label>Điện thoại</label><span>${c.phone}</span></div>
      <div class="detail-item"><label>Tỉnh/Thành</label><span>${c.province}</span></div>
      <div class="detail-item"><label>Phân khúc</label><span>${segmentBadge(c.segment)}</span></div>
      <div class="detail-item"><label>Ngày tham gia</label><span>${c.joinDate}</span></div>
      <div class="detail-item"><label>Tổng đơn hàng</label><span><strong>${c.totalOrders}</strong></span></div>
      <div class="detail-item"><label>Tổng chi tiêu</label><span><strong>${fmtFullCurrency(c.totalSpent)}</strong></span></div>
    </div>
    <div class="detail-divider"></div>
    <div class="detail-title">Lịch Sử Mua Hàng (${orders.length} đơn)</div>
    <div style="max-height:200px;overflow-y:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead><tr style="background:#f8fafc">
          <th style="padding:6px 10px;text-align:left;color:var(--text-muted);border-bottom:1px solid var(--border)">Mã Đơn</th>
          <th style="padding:6px 10px;text-align:left;color:var(--text-muted);border-bottom:1px solid var(--border)">Sản Phẩm</th>
          <th style="padding:6px 10px;text-align:left;color:var(--text-muted);border-bottom:1px solid var(--border)">Ngày</th>
          <th style="padding:6px 10px;text-align:left;color:var(--text-muted);border-bottom:1px solid var(--border)">Giá Trị</th>
          <th style="padding:6px 10px;text-align:left;color:var(--text-muted);border-bottom:1px solid var(--border)">Trạng Thái</th>
        </tr></thead>
        <tbody>${orders.map(o => `
          <tr style="border-bottom:1px solid var(--border)">
            <td style="padding:6px 10px">${o.id}</td>
            <td style="padding:6px 10px">${o.product}</td>
            <td style="padding:6px 10px">${o.date}</td>
            <td style="padding:6px 10px">${fmtFullCurrency(o.value)}</td>
            <td style="padding:6px 10px">${statusBadge(o.status)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
  openModal();
}

function openOrderDetail(id) {
  const o = ORDERS.find(x => x.id === id);
  if (!o) return;
  document.getElementById('modalTitle').textContent = `Chi Tiết Đơn Hàng - ${o.id}`;
  document.getElementById('modalBody').innerHTML = `
    <div class="detail-grid">
      <div class="detail-item"><label>Mã Đơn Hàng</label><span>${o.id}</span></div>
      <div class="detail-item"><label>Khách Hàng</label><span>${o.customerName}</span></div>
      <div class="detail-item"><label>Sản Phẩm</label><span>${o.product}</span></div>
      <div class="detail-item"><label>Số Lượng</label><span>${o.qty}</span></div>
      <div class="detail-item"><label>Ngày Đặt</label><span>${o.date}</span></div>
      <div class="detail-item"><label>Giá Trị</label><span><strong>${fmtFullCurrency(o.value)}</strong></span></div>
      <div class="detail-item"><label>Phương Thức TT</label><span>${o.payment}</span></div>
      <div class="detail-item"><label>Trạng Thái</label><span>${statusBadge(o.status)}</span></div>
    </div>`;
  openModal();
}

function openModal() { document.getElementById('modalOverlay').classList.add('open'); }
function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); }

function confirmDelete(id, type) {
  if (confirm(`Bạn có chắc muốn xóa ${type === 'customer' ? 'khách hàng' : 'đơn hàng'} ${id}?`)) {
    showToast(`Đã xóa ${id}`, 'danger');
  }
}

// ===== NAVIGATION =====
function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(`section-${name}`)?.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector(`[data-section="${name}"]`)?.classList.add('active');
  const titles = { dashboard: 'Tổng Quan', customers: 'Khách Hàng', orders: 'Đơn Hàng', products: 'Sản Phẩm', reports: 'Báo Cáo' };
  document.getElementById('breadcrumbText').textContent = titles[name] || name;
}

// ===== EXPORT CSV =====
function exportCSV() {
  const headers = ['Mã Đơn','Khách Hàng','Sản Phẩm','SL','Ngày Đặt','Giá Trị','Thanh Toán','Trạng Thái'];
  const rows = ORDERS.map(o => [o.id, o.customerName, o.product, o.qty, o.date, o.value, o.payment, o.status]);
  const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'don-hang-2026.csv'; a.click();
  URL.revokeObjectURL(url);
  showToast('Đã xuất file CSV thành công!', 'success');
}

// ===== TOAST =====
let toastContainer;
function showToast(msg, type='') {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  toastContainer.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ===== BIND EVENTS =====
function bindEvents() {
  // Sidebar toggle
  document.getElementById('toggleSidebar').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main');
    sidebar.classList.toggle('collapsed');
    main.classList.toggle('expanded');
  });

  // Nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      showSection(item.dataset.section);
    });
  });

  // View all orders
  document.querySelector('.view-all')?.addEventListener('click', e => {
    e.preventDefault();
    showSection('orders');
  });

  // Modal close
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  // Export
  document.getElementById('exportBtn').addEventListener('click', exportCSV);

  // Global search
  document.getElementById('globalSearch').addEventListener('input', e => {
    const val = e.target.value.toLowerCase();
    if (!val) return;
    // Navigate to customers or orders section based on query
    const matchCust = CUSTOMERS.some(c => c.name.toLowerCase().includes(val) || c.email.toLowerCase().includes(val));
    const matchOrder = ORDERS.some(o => o.id.toLowerCase().includes(val) || o.customerName.toLowerCase().includes(val));
    if (matchOrder) {
      showSection('orders');
      document.getElementById('orderSearch').value = e.target.value;
      orderPage = 1;
      renderOrdersTable();
    } else if (matchCust) {
      showSection('customers');
      document.getElementById('customerSearch').value = e.target.value;
      customerPage = 1;
      renderCustomersTable();
    }
  });

  // Customers filter
  document.getElementById('customerSearch').addEventListener('input', () => { customerPage = 1; renderCustomersTable(); });
  document.getElementById('customerSegmentFilter').addEventListener('change', () => { customerPage = 1; renderCustomersTable(); });

  // Orders filter
  document.getElementById('orderSearch').addEventListener('input', () => { orderPage = 1; renderOrdersTable(); });
  document.getElementById('orderStatusFilter').addEventListener('change', () => { orderPage = 1; renderOrdersTable(); });
  document.getElementById('orderMonthFilter').addEventListener('change', () => { orderPage = 1; renderOrdersTable(); });

  // Products filter
  document.getElementById('productSearch').addEventListener('input', renderProductsTable);
  document.getElementById('productCategoryFilter').addEventListener('change', renderProductsTable);

  // Add customer
  document.getElementById('addCustomerBtn').addEventListener('click', () => {
    showToast('Tính năng thêm khách hàng đang phát triển!', '');
  });

  // Table sort (customers)
  document.querySelectorAll('#customersTable th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (custSortKey === key) custSortAsc = !custSortAsc;
      else { custSortKey = key; custSortAsc = true; }
      renderCustomersTable();
    });
  });

  // Revenue chart type toggle
  document.querySelectorAll('.chart-btn[data-chart="revenue"]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chart-btn[data-chart="revenue"]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      initRevenueChart(btn.dataset.type);
    });
  });
}
