const pool = require('../src/config/database');

const seedDrills = async () => {
  const drills = [
    {
      slug: 'puddle-trap',
      title: 'The Puddle Trap',
      description: 'Master soft ball control with poetic focus',
      video_url: 'https://your-cdn.com/puddle-trap.mp4',
      audio_url: 'https://your-cdn.com/puddle-poem.mp3',
      steps: [
        'Drop ball from hands',
        'Let it land softly on foot',
        'Freeze for 2 seconds',
        'Lower gently to ground'
      ]
    },
    // Add your other drills here
  ];

  for (const drill of drills) {
    await pool.query(
      `INSERT INTO drills (slug, title, description, video_url, audio_url, steps)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (slug) DO NOTHING`,
      [drill.slug, drill.title, drill.description, drill.video_url, drill.audio_url, JSON.stringify(drill.steps)]
    );
  }

  console.log('✅ Drills seeded successfully');
  process.exit(0);
};

seedDrills().catch(console.error);