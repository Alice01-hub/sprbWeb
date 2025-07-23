import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
// 修正默认头像路径为public下相对路径
const defaultAvatar = '/images/webps/七影蝶.webp'
const divineSummaryImg = '/images/webps/神域摘要图.webp'
const butterflyImg = '/images/webps/七影蝶-4.webp'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    160deg,
    #223a5c 0%,         /* 深蓝 */
    #0a192f 40%,        /* 黑蓝 */
    #0c1446 70%,        /* 藏青 */
    #050a1f 100%        /* 纯黑蓝 */
  );
  padding: 20px;
  position: relative;
  overflow-x: hidden;
`

// 星点组件（用motion.div实现动画）
const Star = motion<{x: number, y: number, size: number, opacity: number}>(styled.div`
  position: absolute;
  left: ${props => props.x}vw;
  top: ${props => props.y}vh;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: rgba(255,255,255,${props => props.opacity});
  border-radius: 50%;
  pointer-events: none;
  filter: blur(0.5px);
`)

const BackButton = styled(motion.button)`
  position: fixed;
  top: 30px;
  left: 30px;
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 15px 25px;
  font-size: 18px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  z-index: 100;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`

const Title = styled.h1`
  font-size: 48px;
  color: #fff;
  margin-bottom: 20px;
  font-weight: 700;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 3px 3px 12px rgba(0,0,0,0.45);
  text-align: center;
  /* 移除::before蝴蝶 */
`

const ContentCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 0 15px 40px rgba(255, 165, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 3px solid rgba(255, 165, 0, 0.2);
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`

const ComingSoonIcon = styled.div`
  font-size: 120px;
  margin-bottom: 30px;
  opacity: 0.8;
`

const ComingSoonTitle = styled.h2`
  font-size: 36px;
  color: #FF6B35;
  margin-bottom: 20px;
  font-weight: 700;
`

const ComingSoonText = styled.p`
  font-size: 20px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 30px;
`

const FeatureList = styled.div`
  background: rgba(255, 179, 71, 0.1);
  border-radius: 15px;
  padding: 30px;
  margin-top: 30px;
  text-align: left;
`

const FeatureListTitle = styled.h3`
  font-size: 24px;
  color: #FF6B35;
  margin-bottom: 20px;
  text-align: center;
`

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 18px;
  color: #555;
`

const FeatureIcon = styled.div`
  font-size: 24px;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #FF6B35, #FFB347);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`

const FloatingElement = styled(motion.div)`
  position: absolute;
  font-size: 60px;
  opacity: 0.1;
  pointer-events: none;
`

const FormCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 8px 32px rgba(135, 206, 235, 0.18);
  max-width: 400px;
  margin: 0 auto 40px auto;
  text-align: left;
  border: 2px solid #FFB347;
`

const FormTitle = styled.h3`
  font-size: 26px;
  color: #FF6B35;
  margin-bottom: 20px;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1.5px solid #FFB347;
  font-size: 16px;
  outline: none;
  transition: border 0.2s;
  &:focus {
    border: 1.5px solid #FF6B35;
  }
`

const SubmitButton = styled.button`
  background: linear-gradient(45deg, #FFB347, #FF6B35);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 4px 16px rgba(255, 179, 71, 0.18);
  transition: background 0.2s, transform 0.1s;
  &:hover {
    background: linear-gradient(45deg, #FF6B35, #FFB347);
    transform: translateY(-2px);
  }
`

const Message = styled.div`
  text-align: center;
  font-size: 16px;
  color: #2E8B57;
  margin-top: 10px;
  min-height: 24px;
`

const Tip = styled.div`
  font-size: 13px;
  color: #FF6B35;
  margin-top: 2px;
  min-height: 18px;
  text-align: left;
  transition: opacity 0.2s;
`

const CodeRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
const CodeInput = styled(Input)`
  flex: 1;
`
const CodeButton = styled.button`
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`
const PasswordRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`
const EyeIcon = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #FFB347;
  font-size: 18px;
`

const DivineRealmPage: React.FC = () => {
  const navigate = useNavigate()
  
  // 夜晚图片数组
  const nightImages = [
    '/images/webps/男木岛/男木岛-鸟白岛役场-夜晚.webp',
    '/images/webps/男木岛/男木岛-灯塔-夜晚-熄灯.webp',
    '/images/webps/男木岛/男木岛-鸥相遇小道-夜晚.webp',
    '/images/webps/男木岛/男木岛-泳池-夜晚.webp',
    '/images/webps/男木岛/男木岛-灯塔-夜晚-亮灯.webp',
    '/images/webps/男木岛/男木岛-苍睡觉小道-夜晚.webp',
    '/images/webps/直岛/直岛-港口-有船-夜晚.webp',
    '/images/webps/直岛/直岛-海水浴场-夜晚.webp',
    '/images/webps/直岛/直岛-港口-无船-夜晚.webp',
    '/images/webps/直岛/直岛-海狸家卧室-无床-关灯-夜晚.webp',
    '/images/webps/直岛/直岛-海狸家院子-夜晚.webp',
    '/images/webps/直岛/直岛-小卖部-夜晚.webp',
    '/images/webps/直岛/直岛-白羽钓点-夜晚.webp',
    '/images/webps/直岛/直岛-通往役场道路-夜晚.webp',
    '/images/webps/直岛/直岛-神社-夜晚.webp',
    '/images/webps/直岛/直岛-海狸家门前-夜晚.webp',
    '/images/webps/直岛/直岛-海狸家卧室-有床-关灯-夜晚.webp',
    '/images/webps/直岛/直岛-灵弹-夜晚.webp',
    '/images/webps/女木岛/女木岛-秘密基地山路-夜晚.webp',
    '/images/webps/女木岛/女木岛-采石场入口-夜晚.webp',
    '/images/webps/女木岛/女木岛-山道-夜晚.webp'
  ]
  
  // tab状态：'register'或'login'
  const [tab, setTab] = useState<'register' | 'login'>('register')
  // 注册表单状态
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusField, setFocusField] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  // 新增头像相关状态
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  // 控制登录注册弹窗显示
  const [showAuth, setShowAuth] = useState(false)
  // 当前显示的夜晚图片
  const [currentNightImage, setCurrentNightImage] = useState(() => {
    return nightImages[Math.floor(Math.random() * nightImages.length)]
  })
  // 蝴蝶数量
  const BUTTERFLY_COUNT = 5;
  // 蝴蝶尺寸（像素）
  const butterflySizes = [
    { w: 64, h: 64 },
    { w: 56, h: 56 },
    { w: 48, h: 48 },
    { w: 54, h: 54 },
    { w: 52, h: 52 },
  ];
  // 用户七影蝶相关状态
  const [userButterfly, setUserButterfly] = useState<any>(null)
  // 动态蝴蝶数量
  const totalButterflyCount = userButterfly ? BUTTERFLY_COUNT + 1 : BUTTERFLY_COUNT;
  // 蝴蝶位置状态
  const [butterflyPositions, setButterflyPositions] = useState(
    Array.from({ length: totalButterflyCount }, (_, i) => ({
      left: 0.1 + 0.15 * i,
      top: 0.1 + 0.15 * i,
    }))
  );
  // 当前展示的蝴蝶索引（刷新时随机选80%）
  const [activeButterflies, setActiveButterflies] = useState<number[]>(Array.from({ length: totalButterflyCount }, (_, i) => i));
  // 控制蝴蝶弹窗显示（0:不显示，1~5:第几只）
  const [showButterflyModal, setShowButterflyModal] = useState<0|1|2|3|4|5>(0)
  // 悬停弹窗状态，存储当前悬停的蝴蝶编号（1~5，0为无）
  const [hoverButterfly, setHoverButterfly] = useState<0|1|2|3|4|5>(0);
  // 图片最大宽高
  const mainImgMaxW = 0.9, mainImgMaxH = 0.6; // vw/vh百分比

  // 集中管理七影蝶配置
  const butterflyConfig = [
    {
      label: 'anitabi巡礼网站',
      modalImg: null,
      hoverImg: null,
      link: 'https://anitabi.cn/map',
    },
    {
      label: '空门苍睡觉的小道',
      modalImg: '/images/webps/男木岛/男木岛-苍睡觉小道.webp',
      hoverImg: '/images/webps/男木岛/男木岛-苍睡觉小道.webp',
      link: null,
    },
    {
      label: '小紬的灯塔',
      modalImg: '/images/webps/男木岛/男木岛-紬的灯塔.webp',
      hoverImg: '/images/webps/男木岛/男木岛-紬的灯塔.webp',
      link: null,
    },
    {
      label: '齐须千人的小红书巡礼笔记',
      modalImg: null,
      hoverImg: null,
      link: 'https://www.xiaohongshu.com/discovery/item/67cb0ff80000000009015f05?source=webshare&xhsshare=pc_web&xsec_token=ABsqu3D76eAwSeSBQFe7MfGSblyZpnXnAJZN6ccVffjpg=&xsec_source=pc_share',
    },
    {
      label: '空白的b站巡礼网站视频介绍',
      modalImg: null,
      hoverImg: null,
      link: 'https://www.bilibili.com/video/BV16pgBz7EAs/?spm_id_from=333.337.search-card.all.click&vd_source=88afb36e81beb22aa12c2c69722c5c7f',
    },
  ];

  // 用户七影蝶相关状态
  const [showUserButterflyModal, setShowUserButterflyModal] = useState(false)
  const [userButterflyForm, setUserButterflyForm] = useState({
    label: '',
    image: '', // 只用一个字段
    link: ''
  })
  const [uploadingButterflyImage, setUploadingButterflyImage] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'done'>('idle')
  const [uploadingImageType, setUploadingImageType] = useState<'hover' | 'modal'>('hover')
  const [isEditingButterfly, setIsEditingButterfly] = useState(false)
  const [hoverUserButterfly, setHoverUserButterfly] = useState(false)

  // 蝴蝶动画帧图片
  const butterflyFrames = [
    '/images/webps/七影蝶-3.webp',
    '/images/webps/七影蝶-4.webp',
  ];
  // 蝴蝶动画帧索引（每只独立）
  const [butterflyFramesState, setButterflyFramesState] = useState<number[]>(Array(totalButterflyCount).fill(0));
  // 蝴蝶加速状态（每只独立）
  const [butterflyFastArr, setButterflyFastArr] = useState<boolean[]>(Array(totalButterflyCount).fill(false));
  // 定时器管理
  useEffect(() => {
    const timers: number[] = [];
    for (let i = 0; i < totalButterflyCount; i++) {
      const interval = butterflyFastArr[i] ? 120 : 320;
      timers[i] = window.setInterval(() => {
        setButterflyFramesState(prev => {
          const arr = [...prev];
          arr[i] = (arr[i] + 1) % butterflyFrames.length;
          return arr;
        });
      }, interval);
    }
    return () => { timers.forEach(t => window.clearInterval(t)); };
  }, [butterflyFastArr, totalButterflyCount]);

  // 获取用户七影蝶
  const fetchUserButterfly = async () => {
    if (!token) return
    try {
      const res = await axios.get('/api/butterfly/my-butterfly', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUserButterfly(res.data)
    } catch (err: any) {
      if (err.response?.status !== 404) {
        console.error('获取用户七影蝶失败:', err)
      }
    }
  }

  // 上传七影蝶图片（异步优化，轮询结果）
  const handleButterflyImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !token) return
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('image_type', 'hover') // 后端只用一个字段即可

    setUploadingButterflyImage(true)
    setUploadStatus('uploading')
    setMessage('上传中，请稍后...')
    try {
      // 1. 上传图片，后端返回任务ID或临时图片名
      const res = await axios.post('/api/butterfly/upload-butterfly-image', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      // 假设后端返回 { task_id, status, url }，status=processing时url为临时图，status=done时url为最终图
      let { task_id, status, url } = res.data
      if (status === 'done') {
        setUserButterflyForm(prev => ({ ...prev, image: url }))
        setUploadStatus('done')
        setMessage('图片上传成功')
      } else {
        setUploadStatus('processing')
        setMessage('图片优化中，请稍后...')
        // 2. 轮询后端获取优化后图片
        let pollCount = 0
        const poll = async () => {
          if (pollCount++ > 30) { // 最多轮询30次（约90秒）
            setMessage('图片优化超时，请重试')
            setUploadingButterflyImage(false)
            setUploadStatus('idle')
            return
          }
          try {
            const pollRes = await axios.get(`/api/butterfly/upload-status/${task_id}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
            if (pollRes.data.status === 'done') {
              setUserButterflyForm(prev => ({ ...prev, image: pollRes.data.url }))
              setUploadStatus('done')
              setMessage('图片上传成功')
              setUploadingButterflyImage(false)
            } else {
              setTimeout(poll, 3000)
            }
          } catch {
            setTimeout(poll, 3000)
          }
        }
        poll()
      }
    } catch (err: any) {
      setMessage(err?.response?.data?.detail || '图片上传失败')
      setUploadStatus('idle')
      setUploadingButterflyImage(false)
    }
  }

  // 保存用户七影蝶
  const handleSaveUserButterfly = async () => {
    if (!token || !userButterflyForm.label.trim()) {
      setMessage('请填写标题')
      return
    }
    
    setLoading(true)
    try {
      const payload = {
        label: userButterflyForm.label,
        hoverImg: userButterflyForm.image,
        modalImg: userButterflyForm.image,
        link: userButterflyForm.link
      }
      const res = await axios.post('/api/butterfly/my-butterfly', payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUserButterfly(res.data)
      setShowUserButterflyModal(false)
      setMessage('七影蝶保存成功')
    } catch (err: any) {
      setMessage(err?.response?.data?.detail || '保存失败')
    } finally {
      setLoading(false)
    }
  }

  // 删除用户七影蝶
  const handleDeleteUserButterfly = async () => {
    if (!token) return
    setLoading(true)
    try {
      await axios.delete('/api/butterfly/my-butterfly', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUserButterfly(null)
      setMessage('七影蝶已删除')
    } catch (err: any) {
      setMessage(err?.response?.data?.detail || '删除失败')
    } finally {
      setLoading(false)
    }
  }

  // 生成不重叠的随机位置
  function getRandomButterflyPositions() {
    const positions = [];
    let tries = 0;
    while (positions.length < BUTTERFLY_COUNT && tries < 200) {
      tries++;
      const left = Math.random() * 0.8 + 0.05;
      const top = Math.random() * 0.8 + 0.05;
      let overlap = false;
      for (let i = 0; i < positions.length; i++) {
        const dx = (left - positions[i].left) * mainImgMaxW * window.innerWidth;
        const dy = (top - positions[i].top) * mainImgMaxH * window.innerHeight;
        const minDist = (butterflySizes[positions.length].w + butterflySizes[i].w) / 2 + 12;
        if (dx * dx + dy * dy < minDist * minDist) {
          overlap = true;
          break;
        }
      }
      if (!overlap) positions.push({ left, top });
    }
    if (positions.length < BUTTERFLY_COUNT) {
      return Array.from({ length: BUTTERFLY_COUNT }, (_, i) => ({
        left: 0.1 + 0.15 * i,
        top: 0.1 + 0.15 * i,
      }))
    }
    return positions;
  }

  // 刷新夜晚图片和蝴蝶位置/展示
  const refreshNightImage = () => {
    const newImage = nightImages[Math.floor(Math.random() * nightImages.length)]
    setCurrentNightImage(newImage)
    setButterflyPositions(Array.from({ length: totalButterflyCount }, (_, i) => ({
      left: 0.1 + 0.15 * i,
      top: 0.1 + 0.15 * i,
    })))
    // 随机选80%展示
    const arr = Array.from({ length: totalButterflyCount }, (_, i) => i)
    const showCount = Math.max(1, Math.floor(totalButterflyCount * 0.8))
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    setActiveButterflies(arr.slice(0, showCount))
  }
  // 首次加载也要随机
  useEffect(() => {
    refreshNightImage()
    // eslint-disable-next-line
  }, [])

  // 随机生成星点数组（增加动画参数）
  const [stars] = useState(() => {
    const arr = []
    for (let i = 0; i < 80; i++) {
      arr.push({
        x: Math.random() * 100, // vw
        y: Math.random() * 100, // vh
        size: Math.random() * 1.8 + 0.7, // 0.7~2.5px
        opacity: Math.random() * 0.5 + 0.5, // 0.5~1
        float: Math.random() * 6 + 2, // 浮动幅度2~8px
        duration: Math.random() * 3 + 2 // 动画时长2~5s
      })
    }
    return arr
  })

  // 校验规则
  const validate = () => {
    if (!username || username.length < 3 || username.length > 20) {
      setMessage('用户名长度需为3-20个字符')
      return false
    }
    if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(username)) {
      setMessage('用户名仅支持中英文、数字和下划线')
      return false
    }
    if (!password || password.length < 6 || password.length > 20) {
      setMessage('密码长度需为6-20位')
      return false
    }
    if (!/^[^\s]+$/.test(password)) {
      setMessage('密码不能包含空格')
      return false
    }
    return true
  }

  // 登录后获取用户信息
  const fetchUserInfo = async (tk: string) => {
    try {
      const res = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${tk}` }
      })
      setAvatarUrl(res.data.avatar_url || null)
    } catch {}
  }

  // 注册提交
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    if (!validate()) return
    setLoading(true)
    try {
      await axios.post('/api/auth/register', {
        username,
        password
      })
      setMessage('注册成功，请前往登录')
    } catch (err: any) {
      setMessage(err?.response?.data?.detail || '注册失败')
    } finally {
      setLoading(false)
    }
  }

  // 登录提交
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    if (!validate()) return
    setLoading(true)
    try {
      const res = await axios.post('/api/auth/login', {
        username,
        password
      })
      setMessage('登录成功')
      setToken(res.data.access_token)
      fetchUserInfo(res.data.access_token)
      setShowAuth(false) // 登录成功后关闭弹窗
      // 可跳转到主页或其他页面
      // navigate('/contents')
    } catch (err: any) {
      setMessage(err?.response?.data?.detail || '登录失败')
    } finally {
      setLoading(false)
    }
  }

  // 上传头像
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !token) return
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    setUploading(true)
    try {
      const res = await axios.post('/api/auth/upload-avatar', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      setAvatarUrl(res.data.avatar_url)
      setMessage('头像上传成功')
    } catch {
      setMessage('头像上传失败')
    } finally {
      setUploading(false)
    }
  }

  // 退出登录
  const handleLogout = () => {
    setToken(null)
    setAvatarUrl(null)
    setUserButterfly(null)
    localStorage.removeItem('token')
    setTab('login')
    setMessage('已退出登录')
  }

  // 自动记住token和头像，下次登录自动显示
  useEffect(() => {
    const tk = localStorage.getItem('token')
    if (tk) {
      setToken(tk)
      fetchUserInfo(tk)
    }
  }, [])
  useEffect(() => {
    if (token) localStorage.setItem('token', token)
  }, [token])

  // 当token变化时获取用户七影蝶
  useEffect(() => {
    if (token) {
      fetchUserButterfly()
    }
  }, [token])

  const handleBack = () => {
    navigate('/contents')
  }

  return (
    <Container>
      {/* 星空白点 */}
      {stars.map((star, idx) => (
        <Star
          key={idx}
          x={star.x}
          y={star.y}
          size={star.size}
          opacity={star.opacity}
          animate={{
            y: [0, -star.float, 0, star.float, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: Math.random() * 3
          }}
        />
      ))}
      {/* 右上角头像显示和上传/登录注册按钮 */}
      {token ? (
        <div style={{ position: 'fixed', top: 20, right: 40, zIndex: 200, display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src={avatarUrl ? avatarUrl : defaultAvatar}
            alt="头像"
            style={{ width: 56, height: 56, borderRadius: '50%', border: '3px solid #FFB347', objectFit: 'cover', background: '#fff' }}
            onError={(e) => {
              // 如果头像加载失败，使用默认的SVG头像
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjgiIGN5PSIyOCIgcj0iMjgiIGZpbGw9IiNGRkI5NDciLz4KPHN2ZyB4PSIxNCIgeT0iMTQiIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=';
            }}
          />
          <label style={{ cursor: uploading ? 'not-allowed' : 'pointer', color: '#FF6B35', fontWeight: 600 }}>
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} disabled={uploading} />
            {uploading ? '上传中...' : '更换头像'}
          </label>
          <button onClick={handleLogout} style={{ marginLeft: 8, background: '#fff', color: '#FF6B35', border: '1.5px solid #FFB347', borderRadius: 8, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>退出登录</button>
        </div>
      ) : (
        <button
          style={{ position: 'fixed', top: 20, right: 40, zIndex: 200, background: 'linear-gradient(45deg, #FFB347, #FF6B35)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 4px 16px rgba(255, 179, 71, 0.18)' }}
          onClick={() => setShowAuth(true)}
        >登录/注册</button>
      )}
      {/* 夜晚场景图主展示 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
        <Title>神域</Title>
        {/* 夜晚图片和蝴蝶包裹在一起，蝴蝶定位在图片右下角 */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img 
            src={currentNightImage} 
            alt="夜晚场景" 
            style={{ 
              maxWidth: '90vw', 
              maxHeight: '60vh', 
              borderRadius: 24, 
              boxShadow: '0 8px 32px rgba(123,9,183,0.3)',
              border: '2px solid rgba(255,255,255,0.1)',
              display: 'block'
            }} 
          />
          {/* 渲染所有蝴蝶，最后一只是用户七影蝶 */}
          {Array.from({ length: totalButterflyCount }).map((_, idx) => {
            // 判断是否用户七影蝶
            const isUser = userButterfly && idx === totalButterflyCount - 1;
            const label = isUser ? userButterfly.label : butterflyConfig[idx]?.label;
            const hoverImg = isUser ? userButterfly.hoverImg : butterflyConfig[idx]?.hoverImg;
            const modalImg = isUser ? userButterfly.modalImg : butterflyConfig[idx]?.modalImg;
            const link = isUser ? userButterfly.link : butterflyConfig[idx]?.link;
            return activeButterflies.includes(idx) && (
              <React.Fragment key={idx}>
                <img
                  src={butterflyFrames[butterflyFramesState[idx]]}
                  alt={isUser ? '用户七影蝶' : `七影蝶${idx+1}`}
                  style={{
                    position: 'absolute',
                    left: `calc(${butterflyPositions[idx].left * 100}% - ${butterflySizes[idx % butterflySizes.length].w / 2}px)`,
                    top: `calc(${butterflyPositions[idx].top * 100}% - ${butterflySizes[idx % butterflySizes.length].h / 2}px)`,
                    width: butterflySizes[idx % butterflySizes.length].w,
                    height: butterflySizes[idx % butterflySizes.length].h,
                    cursor: 'pointer',
                    filter: isUser ? 'drop-shadow(0 4px 12px rgba(255,165,0,0.6))' : 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
                    zIndex: 10,
                    transition: 'transform 0.2s',
                    border: isUser ? '2px solid #FFB347' : undefined,
                    borderRadius: isUser ? '50%' : undefined,
                  }}
                  onClick={() => {
                    if (link) {
                      window.open(link, '_blank');
                    } else {
                      if (isUser) setShowUserButterflyModal(true);
                      else setShowButterflyModal((idx+1) as 0|1|2|3|4|5);
                    }
                  }}
                  onMouseEnter={() => {
                    if (isUser) setHoverUserButterfly(true);
                    else {
                      setHoverButterfly((idx+1) as 0|1|2|3|4|5);
                      setButterflyFastArr(arr => arr.map((v, i) => i === idx ? true : v));
                    }
                  }}
                  onMouseLeave={() => {
                    if (isUser) setHoverUserButterfly(false);
                    else {
                      setHoverButterfly(0 as 0|1|2|3|4|5);
                      setButterflyFastArr(arr => arr.map((v, i) => i === idx ? false : v));
                    }
                  }}
                />
                {/* 悬停弹窗 */}
                {isUser && hoverUserButterfly && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `calc(${butterflyPositions[idx].left * 100}% - 120px)`,
                      top: `calc(${butterflyPositions[idx].top * 100}% - ${butterflySizes[idx % butterflySizes.length].h / 2 + 120}px)`,
                      background: '#fff',
                      borderRadius: 16,
                      padding: '18px 28px',
                      minWidth: 180,
                      fontSize: 18,
                      color: '#533483',
                      fontWeight: 600,
                      boxShadow: '0 4px 16px rgba(255,165,0,0.13)',
                      zIndex: 100,
                      pointerEvents: 'none',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {hoverImg && (
                      <img src={hoverImg} alt="butterfly" style={{ width: 120, borderRadius: 8, marginBottom: 8, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                    )}
                    {label}
                  </div>
                )}
                {!isUser && hoverButterfly === idx+1 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `calc(${butterflyPositions[idx].left * 100}% - 120px)`,
                      top: `calc(${butterflyPositions[idx].top * 100}% - ${butterflySizes[idx % butterflySizes.length].h / 2 + 120}px)`,
                      background: '#fff',
                      borderRadius: 16,
                      padding: '18px 28px',
                      minWidth: 180,
                      fontSize: 18,
                      color: '#533483',
                      fontWeight: 600,
                      boxShadow: '0 4px 16px rgba(123,9,183,0.13)',
                      zIndex: 100,
                      pointerEvents: 'none',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {hoverImg && (
                      <img src={hoverImg} alt="butterfly" style={{ width: 120, borderRadius: 8, marginBottom: 8, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                    )}
                    {label}
                  </div>
                )}
              </React.Fragment>
            );
          })}
          {/* 用户七影蝶 */}
          {userButterfly && (
            <>
              <img
                src={butterflyFrames[0]}
                alt="用户七影蝶"
                style={{
                  position: 'absolute',
                  left: 'calc(85% - 32px)',
                  top: 'calc(85% - 32px)',
                  width: 64,
                  height: 64,
                  cursor: 'pointer',
                  filter: 'drop-shadow(0 4px 12px rgba(255,165,0,0.6))',
                  zIndex: 15,
                  transition: 'transform 0.2s',
                  border: '2px solid #FFB347',
                  borderRadius: '50%',
                }}
                onClick={() => {
                  if (userButterfly.link) {
                    window.open(userButterfly.link, '_blank');
                  } else {
                    setShowUserButterflyModal(true);
                  }
                }}
                onMouseEnter={() => setHoverUserButterfly(true)}
                onMouseLeave={() => setHoverUserButterfly(false)}
              />
              {hoverUserButterfly && (
                <div
                  style={{
                    position: 'absolute',
                    left: 'calc(85% - 120px)',
                    top: 'calc(85% - 120px)',
                    background: '#fff',
                    borderRadius: 16,
                    padding: '18px 28px',
                    minWidth: 180,
                    fontSize: 18,
                    color: '#533483',
                    fontWeight: 600,
                    boxShadow: '0 4px 16px rgba(255,165,0,0.13)',
                    zIndex: 100,
                    pointerEvents: 'none',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {userButterfly.hoverImg && (
                    <img src={userButterfly.hoverImg} alt="butterfly" style={{ width: 120, borderRadius: 8, marginBottom: 8, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                  )}
                  {userButterfly.label}
                </div>
              )}
            </>
          )}
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button
            onClick={refreshNightImage}
            style={{
              background: 'linear-gradient(45deg, #533483, #7209b7)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 28px',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(123,9,183,0.3)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(123,9,183,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(123,9,183,0.3)'
            }}
          >
            🌙 刷新夜景
          </button>
          {token && (
            <button
              onClick={() => setShowUserButterflyModal(true)}
              style={{
                background: 'linear-gradient(45deg, #FFB347, #FF6B35)',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '12px 28px',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(255,179,71,0.3)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,179,71,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,179,71,0.3)'
              }}
            >
              🦋 {userButterfly ? '编辑我的七影蝶' : '创建我的七影蝶'}
            </button>
          )}
        </div>
      </div>
      {/* 蝴蝶弹窗，支持5只 */}
      {showButterflyModal >= 1 && showButterflyModal <= BUTTERFLY_COUNT && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowButterflyModal(0 as 0|1|2|3|4|5)}>
          <div style={{ background: '#fff', borderRadius: 18, padding: '36px 48px', minWidth: 260, fontSize: 22, color: '#533483', fontWeight: 700, boxShadow: '0 8px 32px rgba(123,9,183,0.18)', position: 'relative', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            {butterflyConfig[showButterflyModal-1].modalImg ? (
              <img src={butterflyConfig[showButterflyModal-1].modalImg!} alt="butterfly" style={{ width: 220, borderRadius: 12, marginBottom: 18, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
            ) : null}
            {butterflyConfig[showButterflyModal-1].label}
            <button onClick={() => setShowButterflyModal(0 as 0|1|2|3|4|5)} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#7209b7', cursor: 'pointer' }}>×</button>
          </div>
        </div>
      )}

      {/* 用户七影蝶编辑弹窗 */}
      {showUserButterflyModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => { setShowUserButterflyModal(false); setIsEditingButterfly(false); }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: '36px 48px', minWidth: 400, maxWidth: 600, fontSize: 18, color: '#533483', fontWeight: 600, boxShadow: '0 8px 32px rgba(123,9,183,0.18)', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: 24, textAlign: 'center', fontSize: 24, fontWeight: 700 }}>🦋 {userButterfly ? '我的七影蝶' : '创建我的七影蝶'}</h3>
            {/* 只读模式 */}
            {!isEditingButterfly && userButterfly && (
              <div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>标题</div>
                  <div style={{ padding: '10px 0', color: '#333', fontSize: 18 }}>{userButterfly.label || '（无）'}</div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>图片</div>
                  {userButterfly.hoverImg ? (
                    <img src={userButterfly.hoverImg} alt="七影蝶图片" style={{ width: 80, height: 80, borderRadius: 10, objectFit: 'cover', border: '1.5px solid #FFB347' }} />
                  ) : <span style={{ color: '#aaa' }}>（无图片）</span>}
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>链接</div>
                  {userButterfly.link ? (
                    <a href={userButterfly.link} target="_blank" rel="noopener noreferrer" style={{ color: '#3498db' }}>{userButterfly.link}</a>
                  ) : <span style={{ color: '#aaa' }}>（无）</span>}
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
                  <button
                    onClick={() => {
                      setIsEditingButterfly(true)
                      setUserButterflyForm({
                        label: userButterfly.label || '',
                        image: userButterfly.hoverImg || '',
                        link: userButterfly.link || ''
                      })
                    }}
                    style={{
                      padding: '12px 32px',
                      background: 'linear-gradient(45deg, #FFB347, #FF6B35)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >编辑</button>
                  <button
                    onClick={() => { setShowUserButterflyModal(false); setIsEditingButterfly(false); }}
                    style={{
                      padding: '12px 32px',
                      background: '#f1f2f6',
                      color: '#2f3542',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >关闭</button>
                </div>
              </div>
            )}
            {/* 编辑/创建模式 */}
            {(isEditingButterfly || !userButterfly) && (
              <>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>标题 *</label>
                  <input
                    type="text"
                    value={userButterflyForm.label}
                    onChange={(e) => setUserButterflyForm(prev => ({ ...prev, label: e.target.value }))}
                    placeholder="请输入七影蝶标题"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1.5px solid #FFB347',
                      borderRadius: 8,
                      fontSize: 16,
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>图片（可选，悬停和弹窗共用）</label>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleButterflyImageUpload}
                      disabled={uploadingButterflyImage}
                      style={{ display: 'none' }}
                      id="butterfly-image-upload"
                    />
                    <label
                      htmlFor="butterfly-image-upload"
                      style={{
                        padding: '8px 16px',
                        background: uploadingButterflyImage ? '#ccc' : 'linear-gradient(45deg, #87CEEB, #98E4D6)',
                        color: '#fff',
                        borderRadius: 6,
                        cursor: uploadingButterflyImage ? 'not-allowed' : 'pointer',
                        fontSize: 14,
                        fontWeight: 600
                      }}
                    >
                      {uploadingButterflyImage ? (uploadStatus === 'processing' ? '优化中...' : '上传中...') : '选择图片'}
                    </label>
                    {uploadStatus !== 'idle' && (
                      <span style={{ color: '#FF6B35', marginLeft: 10, fontSize: 13 }}>
                        {message}
                      </span>
                    )}
                    {userButterflyForm.image && (
                      <img src={userButterflyForm.image} alt="七影蝶图片" style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover' }} />
                    )}
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>链接（可选）</label>
                  <input
                    type="url"
                    value={userButterflyForm.link}
                    onChange={(e) => setUserButterflyForm(prev => ({ ...prev, link: e.target.value }))}
                    placeholder="https://example.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1.5px solid #FFB347',
                      borderRadius: 8,
                      fontSize: 16,
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                  <button
                    onClick={handleSaveUserButterfly}
                    disabled={loading}
                    style={{
                      padding: '12px 24px',
                      background: loading ? '#ccc' : 'linear-gradient(45deg, #FFB347, #FF6B35)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {loading ? '保存中...' : '保存'}
                  </button>
                  {userButterfly && (
                    <button
                      onClick={handleDeleteUserButterfly}
                      disabled={loading}
                      style={{
                        padding: '12px 24px',
                        background: loading ? '#ccc' : '#ff4757',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: loading ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {loading ? '删除中...' : '删除'}
                    </button>
                  )}
                  <button
                    onClick={() => { setIsEditingButterfly(false); if (userButterfly) setUserButterflyForm({ label: userButterfly.label || '', image: userButterfly.hoverImg || '', link: userButterfly.link || '' }); else setUserButterflyForm({ label: '', image: '', link: '' }); }}
                    style={{
                      padding: '12px 24px',
                      background: '#f1f2f6',
                      color: '#2f3542',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >取消</button>
                </div>
              </>
            )}
            <button onClick={() => { setShowUserButterflyModal(false); setIsEditingButterfly(false); }} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#7209b7', cursor: 'pointer' }}>×</button>
          </div>
        </div>
      )}

      {/* 登录/注册弹窗 */}
      {showAuth && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowAuth(false)}>
          <div style={{ background: '#fff', borderRadius: 18, padding: '36px 48px', minWidth: 400, maxWidth: 500, fontSize: 18, color: '#533483', fontWeight: 600, boxShadow: '0 8px 32px rgba(123,9,183,0.18)', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: 24, textAlign: 'center', fontSize: 24, fontWeight: 700 }}>🔐 {tab === 'login' ? '登录' : '注册'}</h3>
            
            {/* 切换按钮 */}
            <div style={{ display: 'flex', marginBottom: 24, borderRadius: 8, overflow: 'hidden', border: '2px solid #FFB347' }}>
              <button
                onClick={() => setTab('login')}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: tab === 'login' ? 'linear-gradient(45deg, #FFB347, #FF6B35)' : '#f1f2f6',
                  color: tab === 'login' ? '#fff' : '#2f3542',
                  border: 'none',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                登录
              </button>
              <button
                onClick={() => setTab('register')}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: tab === 'register' ? 'linear-gradient(45deg, #FFB347, #FF6B35)' : '#f1f2f6',
                  color: tab === 'register' ? '#fff' : '#2f3542',
                  border: 'none',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                注册
              </button>
            </div>

            <form onSubmit={tab === 'login' ? handleLogin : handleRegister}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>用户名</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入用户名"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1.5px solid #FFB347',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
                {tab === 'register' && (
                  <div style={{ 
                    fontSize: 12, 
                    color: '#FF6B35', 
                    marginTop: 4,
                    lineHeight: '1.4'
                  }}>
                    💡 用户名规则：3-20个字符，支持中英文、数字和下划线
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>密码</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="请输入密码"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      paddingRight: '50px',
                      border: '1.5px solid #FFB347',
                      borderRadius: 8,
                      fontSize: 16,
                      outline: 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#FFB347',
                      fontSize: 18
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {tab === 'register' && (
                  <div style={{ 
                    fontSize: 12, 
                    color: '#FF6B35', 
                    marginTop: 4,
                    lineHeight: '1.4'
                  }}>
                    💡 密码规则：6-20位字符，不能包含空格
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 24 }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: loading ? '#ccc' : 'linear-gradient(45deg, #FFB347, #FF6B35)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? (tab === 'login' ? '登录中...' : '注册中...') : (tab === 'login' ? '登录' : '注册')}
                </button>
              </div>

              {message && (
                <div style={{ 
                  textAlign: 'center', 
                  color: message.includes('成功') ? '#2E8B57' : '#FF6B35',
                  fontSize: 14,
                  marginBottom: 16
                }}>
                  {message}
                </div>
              )}
            </form>

            <button onClick={() => setShowAuth(false)} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#7209b7', cursor: 'pointer' }}>×</button>
          </div>
        </div>
      )}
      
      {/* 移除背景中的FloatingElement图标元素 */}
      {/* 只保留夜晚背景和主内容 */}

      <BackButton
        onClick={handleBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🏠 返回目录
      </BackButton>

      {/* 移除页面中间的注册窗口（FormCard） */}
      {/* 只保留主图和弹窗逻辑 */}
    </Container>
  )
}

export default DivineRealmPage 