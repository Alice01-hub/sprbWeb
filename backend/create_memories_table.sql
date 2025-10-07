-- 神域蝴蝶记忆数据表
-- 在Supabase SQL编辑器中运行此脚本来创建表

-- 创建memories表
CREATE TABLE IF NOT EXISTS memories (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_name TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  audio_url TEXT,
  web_url TEXT,
  weight INTEGER CHECK (weight >= 1 AND weight <= 5) DEFAULT 3,
  is_published BOOLEAN DEFAULT false
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_memories_is_published ON memories(is_published);
CREATE INDEX IF NOT EXISTS idx_memories_weight ON memories(weight);
CREATE INDEX IF NOT EXISTS idx_memories_created_at ON memories(created_at DESC);

-- 启用行级安全策略 (RLS)
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略 (允许任何人读取已发布的记忆)
CREATE POLICY "允许公开读取已发布的记忆" ON memories
  FOR SELECT
  USING (is_published = true);

-- 如果需要管理员权限来插入/更新/删除数据，可以创建以下策略
-- 注意：需要根据实际的认证系统调整
CREATE POLICY "仅认证用户可以插入记忆" ON memories
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "仅认证用户可以更新记忆" ON memories
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "仅认证用户可以删除记忆" ON memories
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- 插入测试数据
INSERT INTO memories (user_name, title, content, weight, is_published) VALUES
('旅行者A', '七影蝶的记忆', '在鸟白岛的夏天，我第一次看到了七影蝶。它们的翅膀在阳光下闪烁着七种颜色，就像是梦境中的生物。', 5, true),
('旅行者B', '海边的约定', '我们在海边许下了约定，说好要一起看遍这座岛上的所有风景。虽然时光流逝，但那份约定依然刻在心中。', 4, true),
('旅行者C', '夏日回忆', '夏天的鸟白岛总是充满了欢声笑语，蝉鸣声、海浪声、还有朋友们的笑声，这些声音交织成了最美好的回忆。', 3, true),
('旅行者D', '灯塔的守望', '站在灯塔顶端，可以看到整个鸟白岛的全貌。那一刻，我感觉自己仿佛能够触摸到天空。', 4, true),
('旅行者E', '星空下的誓言', '在满天繁星的夜晚，我们躺在沙滩上，数着天上的星星。那是我这辈子见过的最美的星空。', 5, true),
('旅行者F', '神域的传说', '据说在鸟白岛上有一个神秘的神域，只有心怀纯净愿望的人才能找到。我一直相信，总有一天我会找到它。', 3, true),
('旅行者G', '夕阳余晖', '傍晚的海边，夕阳将天空染成了橙红色。我坐在岸边，看着太阳慢慢沉入海平面，心中涌起一股难以言喻的情感。', 2, true),
('旅行者H', '蝴蝶的舞蹈', '七影蝶在花丛中翩翩起舞，它们的舞姿优雅而神秘。我伸出手，一只蝴蝶轻轻落在我的指尖。', 4, true),
('旅行者I', '海风的低语', '海风吹过，带来了海洋的气息。我闭上眼睛，仿佛能听到海风在耳边轻声低语，讲述着这座岛屿的故事。', 2, true),
('旅行者J', '永恒的夏天', '如果可以的话，我希望这个夏天永远不要结束。鸟白岛的夏天，就像是被施了魔法一样，让人流连忘返。', 5, true);

-- 查询测试：获取所有已发布的蝴蝶记忆
SELECT * FROM memories WHERE is_published = true ORDER BY weight DESC, created_at DESC;

-- 说明：
-- 1. 在Supabase Dashboard中，进入SQL Editor
-- 2. 复制并粘贴上述SQL代码
-- 3. 点击"Run"执行
-- 4. 执行完成后，前往Table Editor查看memories表
-- 5. 现在可以在神域页面看到飞舞的蝴蝶了！

