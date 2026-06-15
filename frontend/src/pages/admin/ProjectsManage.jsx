import AdminResourcePage from './AdminResourcePage';

const fields = [
  { name: 'title', label: 'Tên dự án', required: true },
  { name: 'slug', label: 'Slug URL', required: true },
  { name: 'category', label: 'Loại công trình', type: 'select', options: ['Nhà phố', 'Biệt thự', 'Nhà cấp 4', 'Cải tạo'], defaultValue: 'Nhà phố', required: true },
  { name: 'location', label: 'Địa điểm' },
  { name: 'area', label: 'Diện tích' },
  { name: 'floors', label: 'Số tầng', type: 'number', defaultValue: 1 },
  { name: 'estimatedCost', label: 'Chi phí dự kiến' },
  { name: 'constructionTime', label: 'Thời gian thi công' },
  { name: 'status', label: 'Trạng thái', type: 'select', options: ['Đang thi công', 'Đã hoàn thành'], defaultValue: 'Đang thi công' },
  { name: 'isFeatured', label: 'Dự án nổi bật', type: 'checkbox', defaultValue: false },
  { name: 'thumbnail', label: 'Ảnh đại diện URL', full: true },
  { name: 'shortDescription', label: 'Mô tả ngắn', type: 'textarea', rows: 3, full: true },
  { name: 'description', label: 'Mô tả chi tiết', type: 'textarea', rows: 6, full: true },
  { name: 'images', label: 'Danh sách ảnh, mỗi URL một dòng', type: 'array', rows: 4, full: true },
];

const columns = [
  { key: 'title', label: 'Tên dự án' },
  { key: 'category', label: 'Loại' },
  { key: 'location', label: 'Địa điểm' },
  { key: 'status', label: 'Trạng thái', render: (item) => (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${item.status === 'Đã hoàn thành' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
      {item.status}
    </span>
  ) },
  { key: 'isFeatured', label: 'Nổi bật', render: (item) => item.isFeatured ? 'Có' : 'Không' },
];

const ProjectsManage = () => (
  <AdminResourcePage title="Dự án" endpoint="/projects" fields={fields} columns={columns} searchPlaceholder="Tìm dự án..." />
);

export default ProjectsManage;
