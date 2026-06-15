import React, { useEffect, useMemo, useState } from 'react';
import { Edit2, Plus, Search, Trash2, X } from 'lucide-react';
import api from '../../services/api';

const emptyFromFields = (fields) => fields.reduce((acc, field) => {
  acc[field.name] = field.defaultValue ?? (field.type === 'checkbox' ? false : '');
  return acc;
}, {});

const normalizePayload = (data, fields) => fields.reduce((acc, field) => {
  const value = data[field.name];
  if (field.type === 'number') acc[field.name] = value === '' ? undefined : Number(value);
  else if (field.type === 'array') acc[field.name] = String(value || '').split('\n').map((item) => item.trim()).filter(Boolean);
  else acc[field.name] = value;
  return acc;
}, {});

const toFormData = (item, fields) => fields.reduce((acc, field) => {
  const value = item?.[field.name];
  acc[field.name] = Array.isArray(value) ? value.join('\n') : value ?? field.defaultValue ?? (field.type === 'checkbox' ? false : '');
  return acc;
}, {});

const AdminResourcePage = ({ title, endpoint, fields, columns, searchPlaceholder = 'Tìm kiếm...' }) => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState(emptyFromFields(fields));
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(endpoint);
      setItems(Array.isArray(data) ? data : []);
    } catch (_error) {
      setMessage('Không tải được dữ liệu. Vui lòng kiểm tra API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [endpoint]);

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return items;
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(keyword));
  }, [items, query]);

  const openNew = () => {
    setEditingId(null);
    setFormData(emptyFromFields(fields));
    setMessage('');
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id);
    setFormData(toFormData(item, fields));
    setMessage('');
    setShowModal(true);
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const payload = normalizePayload(formData, fields);
      if (editingId) await api.put(`${endpoint}/${editingId}`, payload);
      else await api.post(endpoint, payload);
      setShowModal(false);
      setEditingId(null);
      await fetchItems();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Không lưu được dữ liệu.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Xóa "${item.title || item.companyName || item.fullName || 'mục này'}"?`)) return;
    try {
      await api.delete(`${endpoint}/${item._id}`);
      await fetchItems();
    } catch (_error) {
      setMessage('Không xóa được dữ liệu.');
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500">Quản lý nội dung hiển thị trên website DAD.</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2 font-semibold text-white hover:bg-yellow-600">
          <Plus size={18} /> Thêm mới
        </button>
      </div>

      {message && <div className="mb-4 rounded-sm border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">{message}</div>}

      <div className="overflow-hidden rounded-sm border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50 p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} className="w-full rounded-sm border border-gray-200 py-2 pl-10 pr-4 outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-gray-100 text-gray-500">
                <tr>
                  {columns.map((column) => <th key={column.key} className="p-4 font-medium">{column.label}</th>)}
                  <th className="p-4 text-right font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <td key={column.key} className="p-4 text-gray-700">{column.render ? column.render(item) : item[column.key]}</td>
                    ))}
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(item)} className="rounded-sm p-2 text-blue-600 hover:bg-blue-50" title="Sửa"><Edit2 size={17} /></button>
                        <button onClick={() => handleDelete(item)} className="rounded-sm p-2 text-red-600 hover:bg-red-50" title="Xóa"><Trash2 size={17} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!filteredItems.length && (
                  <tr><td colSpan={columns.length + 1} className="p-8 text-center text-gray-500">Chưa có dữ liệu phù hợp.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-sm bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Cập nhật' : 'Thêm mới'} {title.toLowerCase()}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
              {fields.map((field) => (
                <label key={field.name} className={field.full ? 'md:col-span-2' : ''}>
                  <span className="mb-1 block text-sm font-medium text-gray-700">{field.label}</span>
                  {field.type === 'textarea' || field.type === 'array' ? (
                    <textarea name={field.name} value={formData[field.name]} onChange={handleChange} rows={field.rows || 4} className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:ring-1 focus:ring-primary" required={field.required} />
                  ) : field.type === 'select' ? (
                    <select name={field.name} value={formData[field.name]} onChange={handleChange} className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:ring-1 focus:ring-primary" required={field.required}>
                      {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  ) : field.type === 'checkbox' ? (
                    <input name={field.name} type="checkbox" checked={Boolean(formData[field.name])} onChange={handleChange} className="h-5 w-5 accent-primary" />
                  ) : (
                    <input name={field.name} type={field.type || 'text'} value={formData[field.name]} onChange={handleChange} className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:ring-1 focus:ring-primary" required={field.required} />
                  )}
                </label>
              ))}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 md:col-span-2">
                <button type="button" onClick={() => setShowModal(false)} className="rounded-sm border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">Hủy</button>
                <button type="submit" disabled={saving} className="rounded-sm bg-primary px-5 py-2 font-semibold text-white hover:bg-yellow-600 disabled:opacity-70">{saving ? 'Đang lưu...' : 'Lưu'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResourcePage;
