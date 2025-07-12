from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import json
from datetime import datetime

app = FastAPI(title="Summer Pockets API", version="1.0.0")

# CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MusicTrack(BaseModel):
    id: str
    name: str
    artist: str
    album: str
    duration: Optional[float] = None
    src: str
    cover: Optional[str] = None
    
class PlaylistInfo(BaseModel):
    total: int
    tracks: List[MusicTrack]

@app.get("/api/health")
async def health_check():
    """健康检查"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/api/audio-files")
async def get_audio_files():
    """获取音频文件列表"""
    audio_files = []
    public_audio_path = '../frontend/public/audio'
    
    if os.path.exists(public_audio_path):
        for filename in os.listdir(public_audio_path):
            if filename.endswith(('.mp3', '.wav', '.ogg')):
                audio_files.append({
                    'name': filename,
                    'path': f'/audio/{filename}'
                })
    
    return audio_files

@app.get("/api/music/playlist")
async def get_music_playlist():
    """获取完整音乐播放列表"""
    try:
        tracks = []
        public_audio_path = '../frontend/public/audio'
        
        # 音乐文件和艺术家信息的映射
        music_info = {
            '水月陵 - Summer Pockets.mp3': {
                'name': 'Summer Pockets',
                'artist': '水月陵',
                'album': 'Summer Pockets OST',
                'id': 'summer-pockets'
            },
            '麻枝准 - Sea, You & Me.mp3': {
                'name': 'Sea, You & Me',
                'artist': '麻枝准',
                'album': 'Summer Pockets OST',
                'id': 'sea-you-me'
            },
            '鈴木このみ,VISUAL ARTS  Key - アルカテイル.mp3': {
                'name': 'アルカテイル',
                'artist': '鈴木このみ',
                'album': 'Summer Pockets OST',
                'id': 'alcatale'
            },
            '水月陵 - 夜は短く、空は遠くて….wav': {
                'name': '夜は短く、空は遠くて…',
                'artist': '水月陵',
                'album': 'Summer Pockets OST',
                'id': 'yoru-wa-mijikaku'
            }
        }
        
        if os.path.exists(public_audio_path):
            for filename in os.listdir(public_audio_path):
                if filename.endswith(('.mp3', '.wav', '.ogg')):
                    info = music_info.get(filename, {
                        'name': filename.rsplit('.', 1)[0],
                        'artist': 'Unknown Artist',
                        'album': 'Unknown Album',
                        'id': filename.lower().replace(' ', '-').replace('.', '-')
                    })
                    
                    tracks.append({
                        'id': info['id'],
                        'name': info['name'],
                        'artist': info['artist'],
                        'album': info['album'],
                        'src': f'/audio/{filename}',
                        'cover': None,
                        'duration': None
                    })
        
        # 按照预定义顺序排序
        order = ['summer-pockets', 'sea-you-me', 'alcatale', 'yoru-wa-mijikaku']
        tracks.sort(key=lambda x: order.index(x['id']) if x['id'] in order else len(order))
        
        return {
            'total': len(tracks),
            'tracks': tracks
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取播放列表失败: {str(e)}")

@app.get("/api/music/track/{track_id}")
async def get_track_info(track_id: str):
    """获取单个音轨信息"""
    try:
        playlist = await get_music_playlist()
        
        for track in playlist['tracks']:
            if track['id'] == track_id:
                return track
        
        raise HTTPException(status_code=404, detail="音轨未找到")
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取音轨信息失败: {str(e)}")

@app.post("/api/music/play-stats")
async def log_play_stats(data: dict):
    """记录播放统计数据"""
    try:
        return {"message": "播放统计记录成功", "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"记录播放统计失败: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 