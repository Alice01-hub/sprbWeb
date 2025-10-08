-- 更新memories表，移除title和weight字段
-- 在Supabase SQL编辑器中运行此脚本来更新表结构

-- 删除title字段
ALTER TABLE memories DROP COLUMN IF EXISTS title;

-- 删除weight字段（现在使用字段数量动态计算尺寸）
ALTER TABLE memories DROP COLUMN IF EXISTS weight;

-- 更新测试数据，移除title字段
-- 注意：由于已经移除了title字段，这些INSERT语句会失败
-- 如果需要重新插入测试数据，请使用以下格式：
/*
INSERT INTO memories (user_name, content, is_published) VALUES
('旅行者A', '在鸟白岛的夏天，我第一次看到了七影蝶。它们的翅膀在阳光下闪烁着七种颜色，就像是梦境中的生物。', true),
('旅行者B', '我们在海边许下了约定，说好要一起看遍这座岛上的所有风景。虽然时光流逝，但那份约定依然刻在心中。', true),
('旅行者C', '夏天的鸟白岛总是充满了欢声笑语，蝉鸣声、海浪声、还有朋友们的笑声，这些声音交织成了最美好的回忆。', true),
('旅行者D', '站在灯塔顶端，可以看到整个鸟白岛的全貌。那一刻，我感觉自己仿佛能够触摸到天空。', true),
('旅行者E', '在满天繁星的夜晚，我们躺在沙滩上，数着天上的星星。那是我这辈子见过的最美的星空。', true),
('旅行者F', '据说在鸟白岛上有一个神秘的神域，只有心怀纯净愿望的人才能找到。我一直相信，总有一天我会找到它。', true),
('旅行者G', '傍晚的海边，夕阳将天空染成了橙红色。我坐在岸边，看着太阳慢慢沉入海平面，心中涌起一股难以言喻的情感。', true),
('旅行者H', '七影蝶在花丛中翩翩起舞，它们的舞姿优雅而神秘。我伸出手，一只蝴蝶轻轻落在我的指尖。', true),
('旅行者I', '海风吹过，带来了海洋的气息。我闭上眼睛，仿佛能听到海风在耳边轻声低语，讲述着这座岛屿的故事。', true),
('旅行者J', '如果可以的话，我希望这个夏天永远不要结束。鸟白岛的夏天，就像是被施了魔法一样，让人流连忘返。', true);
*/

-- 查询测试：获取所有已发布的蝴蝶记忆
SELECT * FROM memories WHERE is_published = true ORDER BY created_at DESC;

-- 说明：
-- 1. 在Supabase Dashboard中，进入SQL Editor
-- 2. 复制并粘贴上述SQL代码
-- 3. 点击"Run"执行
-- 4. 执行完成后，前往Table Editor查看memories表
-- 5. 现在蝴蝶记忆将不再显示标题，只显示作者名和内容
