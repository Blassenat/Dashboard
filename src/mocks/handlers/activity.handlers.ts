import { http, HttpResponse, delay } from 'msw';
import { dashboardMock } from '../data/dashboardMock';

export const activityHandlers = [
  http.get('/api/activity', async ({ request }) => {
    await delay(200);
    
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const userId = url.searchParams.get('userId');
    
    let activity = dashboardMock.activity;
    
    if (userId) {
      activity = activity.filter(a => a.userId === parseInt(userId));
    }
    
    return HttpResponse.json({
      activity: activity.slice(0, limit),
      total: activity.length,
      hasMore: activity.length > limit
    });
  }),

  http.get('/api/activity/export', async ({ request }) => {
    await delay(500);
    
    const url = new URL(request.url);
    const format = url.searchParams.get('format') || 'json';
    
    if (format === 'csv') {
      const csv = [
        'User ID,Action,Timestamp,IP Address,Device',
        ...dashboardMock.activity.map(a => 
          `${a.userId},${a.action},${a.timestamp},${a.ipAddress || 'N/A'},${a.device || 'N/A'}`
        )
      ].join('\n');
      
      return new HttpResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="activity-log.csv"'
        }
      });
    }
    
    return HttpResponse.json(dashboardMock.activity);
  }),
];