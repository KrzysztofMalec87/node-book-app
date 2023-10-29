import app from '@/app';

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`🔥[server]: Server is running at http://localhost:${PORT}`);
});

export default server;
