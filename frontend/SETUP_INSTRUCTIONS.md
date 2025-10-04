# Setup Instructions for PricePOL Frontend

## Quick Start

1. Navigate to the frontend directory
2. Install the required `recharts` dependency
3. Start the development server

```bash
cd frontend
bun add recharts
bun run dev
```

The application will be available at `http://localhost:3000`

---

## Installing Required Dependencies

The booking statistics chart component requires the `recharts` library to be installed.

### Install Recharts

Run the following command in the `frontend` directory:

```bash
bun add recharts
```

Or if you're using npm:

```bash
npm install recharts
```

Or if you're using yarn:

```bash
yarn add recharts
```

Or if you're using pnpm:

```bash
pnpm add recharts
```

### What This Adds

- **recharts**: A composable charting library built on React components. Used for rendering the booking statistics bar chart.

### After Installation

Once recharts is installed, the application should work without any TypeScript or module errors. The booking statistics chart will display a bar chart showing the percentage of days booked for each month over the last 12 months.

### Running the Development Server

After installing dependencies, start the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`

### Features Included

1. **Calendar Component** - Interactive date picker with theme support (shadcn/ui)
2. **Theme Toggle** - Cycle between light, dark, and system themes (using next-themes)
3. **Booking Statistics Chart** - Bar chart showing booking percentages for last 12 months (using recharts)
4. **Responsive Layout** - 2-column desktop layout, stacked mobile layout
5. **Mock Data** - Realistic seasonal booking data (higher in summer, moderate in winter)

### Troubleshooting

If you encounter hydration errors, make sure:
- The `suppressHydrationWarning` prop is set on the `<html>` tag in `layout.tsx`
- The calendar component uses ISO date format for `data-day` attributes
- The theme provider wraps all client components

For any other issues, check the browser console for specific error messages.