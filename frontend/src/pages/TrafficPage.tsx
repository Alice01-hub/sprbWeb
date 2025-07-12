import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import AudioPlayer from '../components/AudioPlayer'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg, 
    #87CEEB 0%,    /* 天蓝色 */
    #98E4D6 20%,   /* 薄荷绿 */
    #F4E285 40%,   /* 浅黄色 */
    #FFB347 60%,   /* 金橙色 */
    #FF8C69 80%,   /* 珊瑚色 */
    #FFA07A 100%   /* 浅橙色 */
  );
  position: relative;
  overflow-x: hidden;
`

const Header = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`

const BackButton = styled(motion.button)`
  position: fixed;
  top: 20px;
  left: 20px;
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 12px 20px;
  font-size: 16px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  z-index: 1000;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(135, 206, 235, 0.5);
  }
`

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  color: #FF6B35;
  margin: 20px 0;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 2px 2px 4px rgba(255, 107, 53, 0.3);
  
  &::before {
    content: '🚌 ';
  }
  
  &::after {
    content: ' ✈️';
  }
`

const MainNavigation = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  border-bottom: 2px solid #e0e0e0;
`

const MainNavItem = styled(motion.button)<{ active: boolean }>`
  background: ${props => props.active ? '#FF6B35' : 'transparent'};
  color: ${props => props.active ? 'white' : '#FF6B35'};
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 25px 25px 0 0;
  transition: all 0.3s ease;
  position: relative;
  margin: 0 5px;
  
  &:hover {
    background: ${props => props.active ? '#FF6B35' : 'rgba(255, 107, 53, 0.1)'};
    transform: translateY(-2px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.active ? '#FF6B35' : 'transparent'};
  }
`

const SubNavigation = styled.div`
  display: flex;
  justify-content: center;
  background: #f8f9fa;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`

const SubNavItem = styled(motion.button)<{ active: boolean }>`
  background: ${props => props.active ? '#FFB347' : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px;
  margin: 0 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#FFB347' : 'rgba(255, 179, 71, 0.2)'};
  }
`

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`

const ContentSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`

const SectionTitle = styled.h2`
  color: #FF6B35;
  font-size: 28px;
  margin-bottom: 20px;
  border-bottom: 3px solid #FFB347;
  padding-bottom: 10px;
  display: inline-block;
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
`

const ContentCard = styled(motion.div)`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  border-left: 5px solid #FFB347;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`

const CardTitle = styled.h3`
  color: #FF6B35;
  font-size: 22px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`

const CardContent = styled.div`
  color: #666;
  line-height: 1.6;
  font-size: 16px;
`

const DownloadButton = styled(motion.button)`
  background: linear-gradient(45deg, #FF6B35, #FFB347);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
  }
`

const ComingSoonBadge = styled.div`
  background: #FFB347;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  margin-left: 10px;
`

const TrafficPage: React.FC = () => {
  const navigate = useNavigate()
  const [activeMainTab, setActiveMainTab] = useState<'international' | 'domestic' | 'checklist'>('international')
  const [activeSubTab, setActiveSubTab] = useState<'guangzhou' | 'other'>('guangzhou')
  const [activeDomesticTab, setActiveDomesticTab] = useState<'kansai-takamatsu' | 'other'>('kansai-takamatsu')

  const handleBack = () => {
    navigate('/contents')
  }

  const handleDownloadChecklist = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/download-checklist')
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = 'Summer_Pockets_巡礼任务清单.pdf'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert('下载失败，请稍后重试')
      }
    } catch (error) {
      console.error('下载失败:', error)
      alert('下载失败，请稍后重试')
    }
  }

  const renderInternationalContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="international"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <SubNavigation>
            <SubNavItem 
              active={activeSubTab === 'guangzhou'} 
              onClick={() => setActiveSubTab('guangzhou')}
            >
              广州-春秋航空
            </SubNavItem>
            <SubNavItem 
              active={activeSubTab === 'other'} 
              onClick={() => setActiveSubTab('other')}
            >
              其他城市
              <ComingSoonBadge>即将开放</ComingSoonBadge>
            </SubNavItem>
          </SubNavigation>
          
          <Content>
            {activeSubTab === 'guangzhou' && (
              <ContentGrid>
                <ContentCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <CardTitle>
                    <span>💳</span>
                    机票购买指南
                  </CardTitle>
                  <CardContent>
                    <p><strong>推荐购票平台：</strong></p>
                    <ul>
                      <li>春秋航空官网/APP - 官方直销，价格透明</li>
                      <li>携程/去哪儿 - 比价便捷，促销活动多</li>
                      <li>飞猪 - 阿里系平台，信用保障</li>
                    </ul>
                    <p><strong>购票注意事项：</strong></p>
                    <ul>
                      <li>建议提前1-2个月预订，价格更优惠</li>
                      <li>注意行李额度，春秋航空需单独购买</li>
                      <li>确认护照有效期至少6个月以上</li>
                    </ul>
                  </CardContent>
                </ContentCard>

                <ContentCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <CardTitle>
                    <span>🧳</span>
                    行李托运与安检
                  </CardTitle>
                  <CardContent>
                    <p><strong>行李规格：</strong></p>
                    <ul>
                      <li>手提行李：20cm×30cm×40cm，重量≤7kg</li>
                      <li>托运行李：需单独购买，规格详见官网</li>
                      <li>禁止携带：液体&gt;100ml、充电宝&gt;20000mAh</li>
                    </ul>
                    <p><strong>安检须知：</strong></p>
                    <ul>
                      <li>提前2小时到达机场办理手续</li>
                      <li>电子设备需单独过检</li>
                      <li>液体化妆品需装入透明袋</li>
                    </ul>
                  </CardContent>
                </ContentCard>

                <ContentCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <CardTitle>
                    <span>🛫</span>
                    登机流程
                  </CardTitle>
                  <CardContent>
                    <p><strong>值机流程：</strong></p>
                    <ul>
                      <li>在线值机：起飞前24小时开放</li>
                      <li>机场值机：柜台或自助值机设备</li>
                      <li>选择座位：在线值机可免费选择</li>
                    </ul>
                    <p><strong>登机须知：</strong></p>
                    <ul>
                      <li>提前30分钟到达登机口</li>
                      <li>准备好护照和登机牌</li>
                      <li>注意登机口变更广播</li>
                    </ul>
                  </CardContent>
                </ContentCard>

                <ContentCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <CardTitle>
                    <span>🏯</span>
                    到达日本入境
                  </CardTitle>
                  <CardContent>
                    <p><strong>入境流程：</strong></p>
                    <ul>
                      <li>填写入境记录卡（飞机上发放）</li>
                      <li>护照检查 → 行李提取 → 海关申报</li>
                      <li>准备好返程机票和住宿证明</li>
                    </ul>
                    <p><strong>注意事项：</strong></p>
                    <ul>
                      <li>入境记录卡需如实填写</li>
                      <li>携带现金需申报（超过100万日元）</li>
                      <li>保持手机联系方式畅通</li>
                    </ul>
                  </CardContent>
                </ContentCard>

                <ContentCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <CardTitle>
                    <span>🚇</span>
                    交通卡购买
                  </CardTitle>
                  <CardContent>
                    <p><strong>推荐交通卡：</strong></p>
                    <ul>
                      <li>ICOCA卡 - 关西地区通用</li>
                      <li>SUICA卡 - 全国通用</li>
                      <li>购买地点：机场、车站自动售票机</li>
                    </ul>
                    <p><strong>使用方法：</strong></p>
                    <ul>
                      <li>首次购买包含500日元押金</li>
                      <li>可在便利店、餐厅使用</li>
                      <li>余额不足时可随时充值</li>
                    </ul>
                  </CardContent>
                </ContentCard>

                <ContentCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <CardTitle>
                    <span>🚌</span>
                    机场内换乘指引
                  </CardTitle>
                  <CardContent>
                    <p><strong>交通方式选择：</strong></p>
                    <ul>
                      <li>电车：关西机场快线 → 大阪/神户方向</li>
                      <li>大巴：利木津巴士 → 各主要城市</li>
                      <li>出租车：价格较高，适合多人出行</li>
                    </ul>
                    <p><strong>换乘指引：</strong></p>
                    <ul>
                      <li>跟随"电车"标识前往车站</li>
                      <li>购票后通过检票口</li>
                      <li>确认列车方向和终点站</li>
                    </ul>
                  </CardContent>
                </ContentCard>
              </ContentGrid>
            )}
            
            {activeSubTab === 'other' && (
              <ContentSection>
                <SectionTitle>其他城市攻略</SectionTitle>
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚧</div>
                  <h3 style={{ color: '#FF6B35', marginBottom: '15px' }}>内容准备中</h3>
                  <p style={{ color: '#666', fontSize: '18px' }}>
                    我们正在整理更多城市的交通攻略，包括：
                    <br />
                    北京、上海、深圳、成都、杭州等主要城市
                  </p>
                </div>
              </ContentSection>
            )}
          </Content>
        </motion.div>
      </AnimatePresence>
    )
  }

  const renderDomesticContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="domestic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <SubNavigation>
            <SubNavItem 
              active={activeDomesticTab === 'kansai-takamatsu'} 
              onClick={() => setActiveDomesticTab('kansai-takamatsu')}
            >
              关西机场→高松（电车）
            </SubNavItem>
            <SubNavItem 
              active={activeDomesticTab === 'other'} 
              onClick={() => setActiveDomesticTab('other')}
            >
              其他路线
              <ComingSoonBadge>即将开放</ComingSoonBadge>
            </SubNavItem>
          </SubNavigation>
          
          <Content>
            {activeDomesticTab === 'kansai-takamatsu' && (
              <ContentGrid>
                <ContentCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <CardTitle>
                    <span>🗺️</span>
                    路线概览
                  </CardTitle>
                  <CardContent>
                    <p><strong>总行程时间：</strong>约3.5-4小时</p>
                    <p><strong>换乘次数：</strong>2-3次</p>
                    <p><strong>总费用：</strong>约3,000-4,000日元</p>
                    <p><strong>首末班车：</strong></p>
                    <ul>
                      <li>首班：06:00左右</li>
                      <li>末班：23:00左右</li>
                    </ul>
                    <p><strong>推荐路线：</strong></p>
                    <p>关西机场 → 天王寺 → 冈山 → 高松</p>
                  </CardContent>
                </ContentCard>

                <ContentCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <CardTitle>
                    <span>🚉</span>
                    详细换乘流程
                  </CardTitle>
                  <CardContent>
                    <p><strong>第一段：关西机场 → 天王寺</strong></p>
                    <ul>
                      <li>乘坐：关西机场线快速</li>
                      <li>时间：约45分钟</li>
                      <li>站台：1号站台</li>
                    </ul>
                    <p><strong>第二段：天王寺 → 冈山</strong></p>
                    <ul>
                      <li>乘坐：JR东海道本线</li>
                      <li>时间：约1.5小时</li>
                      <li>换乘：跟随"冈山"标识</li>
                    </ul>
                    <p><strong>第三段：冈山 → 高松</strong></p>
                    <ul>
                      <li>乘坐：JR濑户大桥线</li>
                      <li>时间：约1小时</li>
                      <li>终点：高松站</li>
                    </ul>
                  </CardContent>
                </ContentCard>

                <ContentCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <CardTitle>
                    <span>🎫</span>
                    购票实操
                  </CardTitle>
                  <CardContent>
                    <p><strong>自动售票机使用：</strong></p>
                    <ul>
                      <li>选择语言：点击右上角"English"</li>
                      <li>选择目的地：输入"Takamatsu"</li>
                      <li>选择车票类型：普通车/指定席</li>
                      <li>支付：现金/IC卡/信用卡</li>
                    </ul>
                    <p><strong>人工窗口购票：</strong></p>
                    <ul>
                      <li>出示目的地日文：高松（たかまつ）</li>
                      <li>说明人数和时间</li>
                      <li>确认价格后付款</li>
                    </ul>
                  </CardContent>
                </ContentCard>

                <ContentCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <CardTitle>
                    <span>📱</span>
                    实用工具
                  </CardTitle>
                  <CardContent>
                    <p><strong>推荐APP：</strong></p>
                    <ul>
                      <li>Google Maps - 路线规划</li>
                      <li>Yahoo!乗換案内 - 日本专业换乘</li>
                      <li>JR West - 官方时刻表</li>
                    </ul>
                    <p><strong>实用网站：</strong></p>
                    <ul>
                      <li>Hyperdia - 在线时刻表查询</li>
                      <li>JR West官网 - 票价查询</li>
                      <li>关西机场官网 - 交通信息</li>
                    </ul>
                  </CardContent>
                </ContentCard>
              </ContentGrid>
            )}
            
            {activeDomesticTab === 'other' && (
              <ContentSection>
                <SectionTitle>其他路线攻略</SectionTitle>
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚧</div>
                  <h3 style={{ color: '#FF6B35', marginBottom: '15px' }}>内容准备中</h3>
                  <p style={{ color: '#666', fontSize: '18px' }}>
                    我们正在整理更多交通方式，包括：
                    <br />
                    大巴路线、轮船路线、租车自驾等
                  </p>
                </div>
              </ContentSection>
            )}
          </Content>
        </motion.div>
      </AnimatePresence>
    )
  }

  const renderChecklistContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="checklist"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Content>
            <ContentSection>
              <SectionTitle>巡礼任务清单</SectionTitle>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
                  为帮助零经验网友顺利完成圣地巡礼计划，我们特别制作了详细的任务清单。
                  <br />
                  建议下载PDF版本并打印，逐项打勾确保每一步都不遗漏。
                </p>
                <DownloadButton
                  onClick={handleDownloadChecklist}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>📄</span>
                  下载巡礼清单PDF
                </DownloadButton>
              </div>
              
              <ContentGrid>
                <ContentCard>
                  <CardTitle>
                    <span>✈️</span>
                    出行前准备
                  </CardTitle>
                  <CardContent>
                    <ul>
                      <li>□ 护照/签证办理</li>
                      <li>□ 机票预订</li>
                      <li>□ 住宿预订</li>
                      <li>□ 旅行保险购买</li>
                      <li>□ 日元兑换/银行卡准备</li>
                      <li>□ 手机卡/随身WiFi准备</li>
                      <li>□ 行李打包（衣物、药品、充电器等）</li>
                      <li>□ 重要文件复印/电子备份</li>
                    </ul>
                  </CardContent>
                </ContentCard>

                <ContentCard>
                  <CardTitle>
                    <span>🚌</span>
                    机票与交通
                  </CardTitle>
                  <CardContent>
                    <ul>
                      <li>□ 选择出发城市及航班</li>
                      <li>□ 机票购买平台比价</li>
                      <li>□ 了解行李托运规定</li>
                      <li>□ 熟悉值机与登机流程</li>
                      <li>□ 了解日本入境流程</li>
                      <li>□ 准备交通卡购买</li>
                      <li>□ 查询机场换乘信息</li>
                    </ul>
                  </CardContent>
                </ContentCard>

                <ContentCard>
                  <CardTitle>
                    <span>🗾</span>
                    日本国内行程
                  </CardTitle>
                  <CardContent>
                    <ul>
                      <li>□ 确定机场到高松的交通方式</li>
                      <li>□ 查询详细换乘流程</li>
                      <li>□ 学习购票机使用方法</li>
                      <li>□ 规划景点交通路线</li>
                      <li>□ 准备备用路线方案</li>
                      <li>□ 下载相关交通APP</li>
                      <li>□ 收藏实用网站链接</li>
                    </ul>
                  </CardContent>
                </ContentCard>

                <ContentCard>
                  <CardTitle>
                    <span>📅</span>
                    行程安排与预算
                  </CardTitle>
                  <CardContent>
                    <ul>
                      <li>□ 制定每日行程计划</li>
                      <li>□ 预算分配（交通、住宿、餐饮等）</li>
                      <li>□ 重要景点门票预约</li>
                      <li>□ 热门餐厅预订</li>
                      <li>□ 购物清单准备</li>
                      <li>□ 应急联系方式准备</li>
                    </ul>
                  </CardContent>
                </ContentCard>

                <ContentCard>
                  <CardTitle>
                    <span>💡</span>
                    实用工具推荐
                  </CardTitle>
                  <CardContent>
                    <ul>
                      <li>□ Google Maps（路线规划）</li>
                      <li>□ Yahoo!乗換案内（换乘查询）</li>
                      <li>□ Google Translate（翻译工具）</li>
                      <li>□ 大众点评（餐厅推荐）</li>
                      <li>□ 汇率换算APP</li>
                      <li>□ 天气预报APP</li>
                    </ul>
                  </CardContent>
                </ContentCard>

                <ContentCard>
                  <CardTitle>
                    <span>🎯</span>
                    圣地巡礼专项
                  </CardTitle>
                  <CardContent>
                    <ul>
                      <li>□ 女木岛交通及景点信息</li>
                      <li>□ 男木岛交通及景点信息</li>
                      <li>□ 直岛交通及景点信息</li>
                      <li>□ 轮船时刻表查询</li>
                      <li>□ 景点开放时间确认</li>
                      <li>□ 拍照点位标记</li>
                      <li>□ 游戏场景对比图准备</li>
                    </ul>
                  </CardContent>
                </ContentCard>
              </ContentGrid>
            </ContentSection>
          </Content>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <Container>
      <BackButton
        onClick={handleBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🏠 返回目录
      </BackButton>

      <Header>
        <Title>Summer Pockets 交通攻略</Title>
        <MainNavigation>
          <MainNavItem 
            active={activeMainTab === 'international'} 
            onClick={() => setActiveMainTab('international')}
          >
            国际出发
          </MainNavItem>
          <MainNavItem 
            active={activeMainTab === 'domestic'} 
            onClick={() => setActiveMainTab('domestic')}
          >
            日本国内出发
          </MainNavItem>
          <MainNavItem 
            active={activeMainTab === 'checklist'} 
            onClick={() => setActiveMainTab('checklist')}
          >
            巡礼任务清单
          </MainNavItem>
        </MainNavigation>
      </Header>

      {activeMainTab === 'international' && renderInternationalContent()}
      {activeMainTab === 'domestic' && renderDomesticContent()}
      {activeMainTab === 'checklist' && renderChecklistContent()}

      <AudioPlayer />
    </Container>
  )
}

export default TrafficPage 