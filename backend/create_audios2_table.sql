-- 神域BGM数据表
-- 在Supabase SQL编辑器中运行此脚本来创建表

-- 创建audios2表
CREATE TABLE IF NOT EXISTS audios2 (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  url TEXT NOT NULL,
  is_published BOOLEAN DEFAULT false
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_audios2_is_published ON audios2(is_published);
CREATE INDEX IF NOT EXISTS idx_audios2_id ON audios2(id);

-- 启用行级安全策略 (RLS)
ALTER TABLE audios2 ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略 (允许任何人读取已发布的BGM)
CREATE POLICY "允许公开读取已发布的神域BGM" ON audios2
  FOR SELECT
  USING (is_published = true);

-- 如果需要管理员权限来插入/更新/删除数据，可以创建以下策略
-- 注意：需要根据实际的认证系统调整
CREATE POLICY "仅认证用户可以插入神域BGM" ON audios2
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "仅认证用户可以更新神域BGM" ON audios2
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "仅认证用户可以删除神域BGM" ON audios2
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- 插入测试数据
INSERT INTO audios2 (title, artist, url, is_published) VALUES
('神域序曲', '水月陵', 'https://sprbweb-src.oss-cn-guangzhou.aliyuncs.com/public/audios/divine/1-神域序曲.mp3', true),
('七影蝶之舞', '水月陵', 'https://sprbweb-src.oss-cn-guangzhou.aliyuncs.com/public/audios/divine/2-七影蝶之舞.mp3', true),
('夜空回忆', '水月陵', 'https://sprbweb-src.oss-cn-guangzhou.aliyuncs.com/public/audios/divine/3-夜空回忆.mp3', true),
('星海梦境', '水月陵', 'https://sprbweb-src.oss-cn-guangzhou.aliyuncs.com/public/audios/divine/4-星海梦境.mp3', true),
('蝴蝶飞舞', '水月陵', 'https://sprbweb-src.oss-cn-guangzhou.aliyuncs.com/public/audios/divine/5-蝴蝶飞舞.mp3', true),
('神域深处', '水月陵', 'https://sprbweb-src.oss-cn-guangzhou.aliyuncs.com/public/audios/divine/6-神域深处.mp3', true),
('月光下的记忆', '水月陵', 'https://sprbweb-src.oss-cn-guangzhou.aliyuncs.com/public/audios/divine/7-月光下的记忆.mp3', true),
('永恒之夏', '水月陵', 'https://sprbweb-src.oss-cn-guangzhou.aliyuncs.com/public/audios/divine/8-永恒之夏.mp3', true);

-- 查询测试：获取所有已发布的神域BGM
SELECT * FROM audios2 WHERE is_published = true ORDER BY id;

-- 说明：
-- 1. 在Supabase Dashboard中，进入SQL Editor
-- 2. 复制并粘贴上述SQL代码
-- 3. 点击"Run"执行
-- 4. 执行完成后，前往Table Editor查看audios2表
-- 5. 现在可以在神域页面使用神域BGM播放器了！

-- 字段说明：
-- id: 自增主键
-- title: 歌曲标题
-- artist: 艺术家名称
-- url: 音频文件URL（支持OSS、CDN等）
-- is_published: 是否发布（true时在播放器中显示）
