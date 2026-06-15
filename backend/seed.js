const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Project = require('./models/Project');
const HouseModel = require('./models/HouseModel');
const CompanyInfo = require('./models/CompanyInfo');
const connectDB = require('./config/db');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    await Project.deleteMany();
    await HouseModel.deleteMany();
    await CompanyInfo.deleteMany();

    await User.create({
      name: 'Admin DAD',
      email: 'admin@dadcons.com',
      password: 'password123',
      role: 'admin'
    });

    await CompanyInfo.create({
      companyName: 'DAD Construction',
      slogan: 'Kiến tạo tổ ấm � N�ng tầm kh�ng gian sống',
      phone: '0778236311',
      email: 'dadcons.arc@gmail.com',
      address: 'Đ� Nẵng, Việt Nam',
      aboutShort: 'DAD Construction chuy�n thiết kế v� thi c�ng nh� ở trọn g�i.'
    });

    await Project.insertMany([
      { title: 'Nh� phố hiện đại 3 tầng', slug: 'nha-pho-hien-dai-3-tang', category: 'Nh� phố', location: 'Đ� Nẵng', area: '100m2', floors: 3, status: 'Đ� ho�n th�nh', isFeatured: true },
      { title: 'Biệt thự s�n vườn 2 tầng', slug: 'biet-thu-san-vuon-2-tang', category: 'Biệt thự', location: 'Quảng Nam', area: '250m2', floors: 2, status: 'Đang thi c�ng', isFeatured: true }
    ]);

    await HouseModel.insertMany([
      { title: 'Mẫu nh� phố 5x20m hiện đại', slug: 'mau-nha-pho-5x20m-hien-dai', type: 'Nh� phố', style: 'Hiện đại', area: '100m2', floors: 2, estimatedBuildCost: '1.2 tỷ' },
      { title: 'Mẫu cấp 4 m�i Nhật', slug: 'mau-cap-4-mai-nhat', type: 'Nh� cấp 4', style: 'Tối giản', area: '120m2', floors: 1, estimatedBuildCost: '800 triệu' }
    ]);

    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
