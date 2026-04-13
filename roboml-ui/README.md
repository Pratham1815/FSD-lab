# RoboML Control Center

Interactive Robotics & Machine Learning Dashboard built with **React**, **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui** conventions.

## Features

- **Live sensor telemetry** — proximity, gyroscope, motor load, temperature updated every 2 seconds
- **ML model switcher** — ResNet-50 Vision, LSTM Motion Planner, RL Policy Network
- **Training simulation** — live epoch counter, loss curve chart, accuracy tracking
- **Spline 3D scene** — toggle between SVG robot and interactive 3D Spline scene
- **Robot controls** — directional, arm, emergency stop buttons with system log feedback
- **Confusion matrix** — precision, recall, F1 score for the vision model
- **Hyperparameter tuning** — learning rate, batch size, dropout sliders
- **System log** — live scrolling timestamped terminal

## Tech Stack

| Layer        | Technology |
|--------------|-----------|
| Framework    | Next.js 14 (App Router) |
| Language     | TypeScript |
| Styling      | Tailwind CSS |
| 3D / Spline  | @splinetool/react-spline |
| Animation    | framer-motion |
| Icons        | lucide-react |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles + Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main dashboard page
├── components/
│   ├── ui/
│   │   ├── card.tsx        # shadcn Card
│   │   ├── spotlight.tsx   # Aceternity Spotlight
│   │   └── splite.tsx      # Spline 3D scene wrapper
│   ├── MetricCard.tsx
│   ├── SensorBar.tsx
│   ├── SystemLog.tsx
│   ├── RobotSVG.tsx
│   └── LossChart.tsx
└── lib/
    └── utils.ts            # cn() helper
```

## Enabling the Spline 3D Scene

Click the **"Load 3D Scene"** button in the hero card to switch from the SVG robot to the interactive Spline 3D scene. This lazy-loads `@splinetool/react-spline` and renders the scene at:

```
https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode
```

To use your own scene, edit `src/app/page.tsx` and replace the `scene` URL in the `<SplineScene>` component.

## Lab Experiment Notes

This project demonstrates:
1. **Reusable components** — MetricCard, SensorBar, SystemLog, RobotSVG, LossChart
2. **Dynamic content** — live state updates via `useState` + `useEffect`
3. **Custom hooks pattern** — sensor intervals, training simulation
4. **UI composition** — assembling complex layouts from small components
5. **TypeScript interfaces** — typed props for all components
