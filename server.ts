import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data');
const ORDERS_FILE = path.resolve(DATA_DIR, 'orders.json');
const USERS_FILE = path.resolve(DATA_DIR, 'users.json');

// Ensure data folder and files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

export interface UserRecord {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  createdAt: string;
}

if (!fs.existsSync(USERS_FILE)) {
  // Pre-seed default user "윤성미" so the user can test right away or register anew!
  const defaultUsers: UserRecord[] = [
    {
      id: 'usr_default_seongmi',
      email: 'seongmi@example.com',
      password: 'password123',
      name: '윤성미',
      phone: '010-1234-5678',
      createdAt: new Date().toISOString(),
    },
  ];
  fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2), 'utf-8');
}

function readUsers(): UserRecord[] {
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading users file:', err);
    return [];
  }
}

function writeUsers(users: UserRecord[]): void {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing users file:', err);
  }
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  createdAt: string;
  formattedDate: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  deliveryNote: string;
  productId: string;
  productName: string;
  countText: string;
  unitPrice: number;
  quantity: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: 'card' | 'kakaopay' | 'naverpay' | 'tosspay' | 'bank';
  paymentStatus: '결제완료 (연습결제)' | '입금대기' | '결제완료';
  orderStatus: '접수완료' | '입금확인' | '배송준비' | '배송중' | '배송완료' | '주문취소';
  trackingNumber?: string;
  paymentDetail?: string; // e.g. "신용카드 (1111-2222-3333-4444)"
}

function readOrders(): OrderRecord[] {
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading orders file:', err);
    return [];
  }
}

function writeOrders(orders: OrderRecord[]): void {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing orders file:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // POST: Register user
  app.post('/api/auth/register', (req: Request, res: Response) => {
    try {
      const { email, password, name, phone } = req.body;

      const cleanEmail = String(email || '').trim().toLowerCase();
      const cleanPassword = String(password || '');
      const cleanName = String(name || '').trim();
      const cleanPhone = String(phone || '').trim();

      if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
        return res.status(400).json({
          success: false,
          error: '올바른 이메일 주소를 입력해 주세요. (예: user@naver.com)',
        });
      }

      if (!cleanName) {
        return res.status(400).json({
          success: false,
          error: '고객님의 성함을 입력해 주세요.',
        });
      }

      if (cleanPassword.length < 6) {
        return res.status(400).json({
          success: false,
          error: '비밀번호가 너무 짧아요. 안전을 위해 6자 이상으로 적어주세요.',
        });
      }

      const users = readUsers();
      const existingUser = users.find((u) => u.email === cleanEmail);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: '이미 가입되어 있는 이메일이에요. 로그인하시거나 다른 이메일을 입력해 주세요.',
        });
      }

      const newUser: UserRecord = {
        id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        email: cleanEmail,
        password: cleanPassword,
        name: cleanName,
        phone: cleanPhone || '010-0000-0000',
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      writeUsers(users);

      return res.status(201).json({
        success: true,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          phone: newUser.phone,
        },
        message: `${newUser.name} 님, 회원가입이 완료되었습니다!`,
      });
    } catch (err) {
      console.error('Register error:', err);
      return res.status(500).json({
        success: false,
        error: '회원가입 처리 중 오류가 발생했습니다. 다시 시도해 주세요.',
      });
    }
  });

  // POST: Login user
  app.post('/api/auth/login', (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const cleanEmail = String(email || '').trim().toLowerCase();
      const cleanPassword = String(password || '');

      if (!cleanEmail) {
        return res.status(400).json({
          success: false,
          error: '이메일을 입력해 주세요.',
        });
      }

      if (!cleanPassword) {
        return res.status(400).json({
          success: false,
          error: '비밀번호를 입력해 주세요.',
        });
      }

      if (cleanPassword.length < 6) {
        return res.status(400).json({
          success: false,
          error: '비밀번호는 6자 이상이어야 합니다. 6자 이상으로 입력해 주세요.',
        });
      }

      const users = readUsers();
      const foundUser = users.find((u) => u.email === cleanEmail);

      if (!foundUser) {
        return res.status(404).json({
          success: false,
          error: '가입되지 않은 이메일이에요. 회원가입을 먼저 진행해 주세요.',
        });
      }

      if (foundUser.password !== cleanPassword) {
        return res.status(400).json({
          success: false,
          error: '비밀번호가 맞지 않아요. 다시 한 번 확인해 주세요.',
        });
      }

      return res.json({
        success: true,
        user: {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          phone: foundUser.phone,
        },
        message: `${foundUser.name} 님, 환영합니다!`,
      });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({
        success: false,
        error: '로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.',
      });
    }
  });

  // POST: Create a new real order
  app.post('/api/orders', (req: Request, res: Response) => {
    try {
      const {
        customerName,
        phoneNumber,
        address,
        deliveryNote,
        productId,
        productName,
        countText,
        unitPrice,
        quantity,
        shippingFee,
        paymentMethod,
      } = req.body;

      if (!customerName || !phoneNumber || !address) {
        return res.status(400).json({
          success: false,
          error: '성함, 연락처, 배송지 주소는 필수 입력 사항입니다.',
        });
      }

      const now = new Date();
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const datePart = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
      const generatedOrderNumber = req.body.orderNumber || `ORD-${datePart}-${randomSuffix}`;
      
      const parsedQty = Math.max(1, Number(quantity) || 1);
      const parsedUnitPrice = Number(unitPrice) || 48000;
      const parsedShippingFee = Number(shippingFee) || 0;
      const totalAmount = parsedUnitPrice * parsedQty + parsedShippingFee;

      const validMethod = ['card', 'kakaopay', 'naverpay', 'tosspay', 'bank'].includes(paymentMethod)
        ? paymentMethod
        : 'card';

      const isSimulatedPayment = validMethod !== 'bank';

      const newOrder: OrderRecord = {
        id: `ord_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        orderNumber: generatedOrderNumber,
        createdAt: now.toISOString(),
        formattedDate: `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
        customerName: String(customerName).trim(),
        phoneNumber: String(phoneNumber).trim(),
        address: String(address).trim(),
        deliveryNote: String(deliveryNote || '부재 시 문 앞에 놓아주세요').trim(),
        productId: String(productId || 'box-1'),
        productName: String(productName || '하루생식'),
        countText: String(countText || '30g × 30포'),
        unitPrice: parsedUnitPrice,
        quantity: parsedQty,
        shippingFee: parsedShippingFee,
        totalAmount,
        paymentMethod: validMethod,
        paymentStatus: isSimulatedPayment ? '결제완료 (연습결제)' : '입금대기',
        orderStatus: isSimulatedPayment ? '입금확인' : '접수완료',
        trackingNumber: '',
        paymentDetail: req.body.paymentDetail || (validMethod === 'card' ? '신용카드 (1111-2222-3333-4444)' : validMethod),
      };

      const orders = readOrders();
      orders.unshift(newOrder); // newest first
      writeOrders(orders);

      console.log(`[REAL ORDER CREATED] ${newOrder.orderNumber} - ${newOrder.customerName} (${newOrder.totalAmount.toLocaleString()}원)`);

      return res.status(201).json({
        success: true,
        order: newOrder,
        message: '주문이 성공적으로 접수되어 서버에 안전하게 저장되었습니다.',
      });
    } catch (err) {
      console.error('Failed to create order:', err);
      return res.status(500).json({
        success: false,
        error: '주문 처리 중 서버 오류가 발생했습니다.',
      });
    }
  });

  // GET: Fetch all orders (Store Owner / Admin)
  app.get('/api/orders', (req: Request, res: Response) => {
    try {
      const orders = readOrders();
      return res.json({
        success: true,
        totalCount: orders.length,
        orders,
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: '주문 목록 조회 실패' });
    }
  });

  // GET: Lookup order for a customer by phone or order number
  app.get('/api/orders/lookup', (req: Request, res: Response) => {
    try {
      const query = String(req.query.q || '').trim().replace(/[-\s]/g, '');
      if (!query) {
        return res.status(400).json({ success: false, error: '조회할 전화번호 또는 주문번호를 입력해주세요.' });
      }

      const orders = readOrders();
      const matched = orders.filter((o) => {
        const cleanPhone = o.phoneNumber.replace(/[-\s]/g, '');
        const cleanOrderNum = o.orderNumber.replace(/[-\s]/g, '').toLowerCase();
        return cleanPhone.includes(query) || cleanOrderNum.includes(query.toLowerCase());
      });

      return res.json({
        success: true,
        count: matched.length,
        orders: matched,
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: '주문 조회 중 오류 발생' });
    }
  });

  // PATCH: Update order status / tracking number
  app.patch('/api/orders/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { orderStatus, paymentStatus, trackingNumber } = req.body;

      const orders = readOrders();
      const index = orders.findIndex((o) => o.id === id || o.orderNumber === id);

      if (index === -1) {
        return res.status(404).json({ success: false, error: '해당 주문을 찾을 수 없습니다.' });
      }

      if (orderStatus) orders[index].orderStatus = orderStatus;
      if (paymentStatus) orders[index].paymentStatus = paymentStatus;
      if (trackingNumber !== undefined) orders[index].trackingNumber = trackingNumber;

      writeOrders(orders);

      return res.json({
        success: true,
        order: orders[index],
        message: '주문 상태가 업데이트되었습니다.',
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: '주문 업데이트 실패' });
    }
  });

  // DELETE: Cancel / delete order
  app.delete('/api/orders/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      let orders = readOrders();
      const exists = orders.some((o) => o.id === id || o.orderNumber === id);

      if (!exists) {
        return res.status(404).json({ success: false, error: '해당 주문을 찾을 수 없습니다.' });
      }

      orders = orders.filter((o) => o.id !== id && o.orderNumber !== id);
      writeOrders(orders);

      return res.json({ success: true, message: '주문이 삭제되었습니다.' });
    } catch (err) {
      return res.status(500).json({ success: false, error: '주문 삭제 실패' });
    }
  });

  // Vite Integration in Development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true, port: PORT, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[하루한잔 생식 서버] Running on port ${PORT}`);
  });
}

startServer();
