import AdminResourcePage from './AdminResourcePage';

const fields = [
  { name: 'title', label: 'Tên mẫu nhà', required: true },
  { name: 'slug', label: 'Slug URL', required: true },
  { name: 'type', label: 'Loại nhà', type: 'select', options: ['Nhà phố', 'Biệt thự', 'Nhà cấp 4', 'Nhà mái thái'], defaultValue: 'Nhà phố' },
  { name: 'style', label: 'Phong cách', defaultValue: 'Hiện đại' },
  { name: 'area', label: 'Diện tích' },
  { name: 'floors', label: 'Số tầng', type: 'number', defaultValue: 1 },
  { name: 'bedrooms', label: 'Số phòng ngủ', type: 'number', defaultValue: 3 },
  { name: 'estimatedBuildCost', label: 'Chi phí xây dựng' },
  { name: 'thumbnail', label: 'Ảnh đại diện URL', full: true },
  { name: 'description', label: 'Mô tả', type: 'textarea', rows: 5, full: true },
  { name: 'functions', label: 'Công năng', type: 'textarea', rows: 4, full: true },
  { name: 'images', label: 'Danh sách ảnh, mỗi URL một dòng', type: 'array', rows: 4, full: true },
];

const columns = [
  { key: 'title', label: 'Tên mẫu' },
  { key: 'type', label: 'Loại' },
  { key: 'style', label: 'Phong cách' },
  { key: 'area', label: 'Diện tích' },
  { key: 'estimatedBuildCost', label: 'Chi phí' },
];

const HouseModelsManage = () => (
  <AdminResourcePage title="Mẫu nhà" endpoint="/house-models" fields={fields} columns={columns} searchPlaceholder="Tìm mẫu nhà..." />
);

export default HouseModelsManage;
