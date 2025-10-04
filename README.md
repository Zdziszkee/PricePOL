# Kraków Automatic Property Pricing MVP
## 24-Hour Hackathon Plan

### Executive Summary
Build a minimum viable product for dynamic short-term rental pricing in Kraków, integrating with Booking.com and Airbnb, using multiple pricing algorithms including ML models.

---

## Tech Stack
- **Frontend**: Next.js 15.5, shadcn/ui 3.3.1, TypeScript
- **Backend**: Python 3.13.7, FastAPI
- **Database**: SQLite
- **ML**: scikit-learn, lightweight models only
- **APIs**: Booking.com API, Airbnb unofficial API/scraping

---

## Core Features (Must-Have)

### 1. Property Management
- Add/edit property details (location, size, amenities)
- Link Booking.com and Airbnb listings
- Set base price and minimum/maximum bounds
- Basic calendar view

### 2. Pricing Algorithms (5 methods)

**Core Objective**: Maximize monthly revenue = (occupancy_rate × days_in_month × avg_nightly_rate)

All algorithms aim to find the optimal price point where:
- Price too high → Low occupancy → Lost revenue
- Price too low → High occupancy but revenue per night suffers
- Sweet spot → Maximum total revenue

**1. Rule-Based Pricing**
- Learn multipliers from historical data
- Dynamic rules based on booking patterns
- Adjust based on days until check-in
- Factor in property-specific conversion rates
- Rules evolve based on actual booking performance

**2. Seasonal Pricing**
- Analyze historical occupancy by season
- Calculate price elasticity for different periods
- Find optimal price for each season that maximizes bookings × rate
- Adapt to Kraków tourism patterns from data
- No hardcoded percentages - all learned from market data

**3. Occupancy-Based Dynamic Pricing**
- Real-time adjustment based on current booking rate
- If occupancy low → test lower prices to fill gaps
- If occupancy high → increase price to maximize revenue per booking
- Use demand curves to predict booking probability at each price point
- Optimize for total monthly revenue, not just occupancy percentage

**4. Competition-Based Pricing**
- Scrape current market rates for similar properties
- Analyze competitor occupancy rates (when available)
- Calculate market demand curve
- Position pricing based on property's competitive advantages
- Find price that captures bookings while maximizing revenue

**5. ML Model Pricing - Revenue Optimization**
- **Two-stage ML approach:**
  - **Model 1**: Predict booking probability at given price
  - **Model 2**: Predict revenue outcome (probability × price)
- Features: date, property attributes, market rates, historical performance
- **Objective function**: Maximize expected monthly revenue
- Search optimal price point: test range of prices, select highest expected revenue
- Continuous learning from actual booking results

### 3. Pricing Dashboard

**Property Overview**
- List of user properties with quick stats
- Current price vs recommended price
- Occupancy rate indicator
- Revenue projections

**Pricing Calendar**
- 30-day calendar view
- Color-coded prices (low/medium/high)
- Quick price override capability
- Show which algorithm suggests what price

**Algorithm Comparison**
- Side-by-side price recommendations
- Visual comparison (table or chart)
- Select preferred algorithm or blend
- Show confidence scores for ML model

**Analytics Panel**
- Projected revenue for next 30 days (per algorithm)
- Revenue efficiency: actual vs potential
- Occupancy rate × average rate = total revenue
- Price elasticity indicators
- Booking conversion rates at different price points

### 4. Platform Integration

**Booking.com Integration**
- OAuth or API key authentication
- Fetch property details and calendar
- Read current prices and availability
- Push price updates
- Sync availability status

**Airbnb Integration**
- Authentication flow
- Import property data
- Read calendar and pricing
- Update prices via API
- Sync bookings

**Sync System**
- Manual sync trigger
- Background sync (hourly or configurable)
- Sync status indicators
- Error handling and retry logic
- Last sync timestamp display

---

## Database Schema

### Properties Table
- id, user_id, name, address, district
- property_type, bedrooms, bathrooms, max_guests
- amenities (JSON array)
- base_price, min_price, max_price
- booking_com_id, airbnb_id
- created_at, updated_at

### Pricing Rules Table
- id, property_id, rule_type
- conditions (JSON)
- adjustment_percentage
- active, priority
- created_at

### Price History Table
- id, property_id, date
- recommended_price, algorithm_used
- actual_price_set, was_booked
- revenue_generated (null if not booked)
- created_at

### Market Data Table
- id, district, date
- average_price, median_price
- occupancy_rate, sample_size
- collected_at

### Booking Probability Table
- id, property_id, price_point
- predicted_booking_probability
- confidence_score, date_range
- created_at

### Calendar Sync Table
- id, property_id, platform
- date, availability
- current_price, synced_price
- last_synced_at

### ML Model Metadata
- id, version, accuracy_score
- training_date, feature_list (JSON)
- model_path

---

## API Endpoints

### Property Management
- `POST /api/properties` - Create new property
- `GET /api/properties` - List all user properties
- `GET /api/properties/{id}` - Get property details
- `PUT /api/properties/{id}` - Update property
- `DELETE /api/properties/{id}` - Delete property

### Pricing Engine
- `POST /api/pricing/calculate` - Calculate prices using all algorithms
- `POST /api/pricing/calculate/rule-based` - Rule-based only
- `POST /api/pricing/calculate/seasonal` - Seasonal only
- `POST /api/pricing/calculate/occupancy` - Occupancy-based only
- `POST /api/pricing/calculate/competition` - Competition-based only
- `POST /api/pricing/calculate/ml` - ML model only
- `GET /api/pricing/calendar/{property_id}` - Get 30-day pricing calendar
- `POST /api/pricing/apply` - Apply recommended price to platforms
- `GET /api/pricing/history/{property_id}` - Price history

### Platform Integrations
- `POST /api/integrations/booking/connect` - Connect Booking.com account
- `POST /api/integrations/airbnb/connect` - Connect Airbnb account
- `GET /api/integrations/booking/properties` - Fetch Booking.com properties
- `GET /api/integrations/airbnb/properties` - Fetch Airbnb properties
- `POST /api/integrations/sync` - Manual sync trigger
- `GET /api/integrations/status/{property_id}` - Sync status
- `POST /api/integrations/push-price` - Push price to platform

### ML Model
- `POST /api/ml/predict` - Get ML price prediction
- `GET /api/ml/model-info` - Model metadata and accuracy
- `POST /api/ml/retrain` - Trigger model retraining (admin)

### Analytics
- `GET /api/analytics/revenue/{property_id}` - Revenue projections and optimization metrics
- `GET /api/analytics/occupancy/{property_id}` - Occupancy stats and trends
- `GET /api/analytics/market/{district}` - Market analysis by district
- `GET /api/analytics/price-elasticity/{property_id}` - Price sensitivity analysis
- `GET /api/analytics/revenue-optimization` - Compare revenue across algorithms

---

## Kraków-Specific Features

### Dynamic District Learning
- No hardcoded pricing tiers
- Continuously scrape and analyze market data by district
- Learn district premium/discount from actual market behavior
- Update district benchmarks weekly
- Properties automatically positioned relative to market

### Adaptive Seasonal Patterns
- Learn seasonal patterns from historical data
- Detect high/low demand periods automatically
- No predefined season multipliers
- Adjust based on observed booking patterns
- Factor in year-over-year trends

### Event Detection & Impact Analysis
- Scrape event calendars for Kraków
- Measure historical price/occupancy impact of events
- Automatically adjust for detected events
- Learn which events actually drive bookings
- Calculate event-specific price elasticity

### Competition Intelligence
- Real-time competitor price scraping by district
- Analyze competitor occupancy when available
- Calculate market demand curves
- Identify pricing gaps and opportunities
- No assumptions about district hierarchy - let data decide

---

## ML Model Specification

### Revenue Optimization Approach

**Primary Objective**: Maximize total monthly revenue = Σ(booking_probability × price × nights)

### Two-Model Architecture

**Model 1: Booking Probability Predictor**
- Predicts P(booking | price, features)
- Classification model (booked vs not booked)
- Outputs probability score 0-1

**Model 2: Revenue Optimizer**
- Uses Model 1 predictions
- Tests price range (e.g., 100-500 PLN in 10 PLN steps)
- Calculates expected revenue = price × P(booking at price)
- Selects price with maximum expected revenue

### Training Data Requirements
- **Minimum**: 200-300 Kraków property-night records
- **Essential fields**: price_set, was_booked, date, property_features
- **Ideal**: 1000+ records with booking outcomes
- **Sources**: Scraped historical data or synthetic based on market patterns

### Features (Input)
**Temporal Features**
- day_of_week (0-6)
- month (1-12)
- days_until_checkin (lead time)
- is_weekend (bool)
- is_long_weekend (bool)

**Property Features**
- district (categorical, learned from data)
- bedrooms, bathrooms, max_guests
- amenities_count
- property_rating (if available)

**Market Features**
- current_market_avg_price_in_district
- competitor_avg_price (similar properties)
- district_occupancy_rate
- price_position (% vs market average)

**Historical Features**
- property_avg_occupancy_last_30d
- property_avg_rate_last_30d
- property_conversion_rate

### Target Variables

**For Model 1 (Booking Probability)**
- Binary: booked (1) or not_booked (0)

**For Model 2 (Revenue Optimization)**
- Continuous: expected_revenue = price × booking_probability

### Model Options

**Option 1: Logistic Regression + Grid Search**
- Model 1: Logistic regression for booking probability
- Model 2: Grid search over price range
- Pros: Fast, interpretable, good baseline
- Training time: ~10 minutes

**Option 2: XGBoost + Optimization**
- Model 1: XGBoost classifier for booking probability
- Model 2: Numerical optimization for price
- Pros: Better accuracy, handles non-linearities
- Training time: ~20-30 minutes

**Option 3: Direct Revenue Regression**
- Single model predicting revenue directly
- Input: price + features → Output: expected revenue
- Train on price × booking_outcome pairs
- Simpler but potentially less accurate

### Model Evaluation

**Booking Probability Model Metrics**
- Accuracy, Precision, Recall
- ROC-AUC score
- Calibration plot (predicted vs actual booking rate)

**Revenue Optimization Metrics**
- Revenue achieved vs potential (efficiency %)
- Average revenue per available night
- Revenue compared to naive pricing strategies
- Backtest on historical data

### Price Elasticity Learning
- Calculate from model: how booking probability changes with price
- Identify optimal price range for each property
- Visualize demand curve
- Update continuously as new data arrives

### Deployment
- Serialize both models (pickle/joblib)
- Load on FastAPI startup
- Prediction flow:
  1. Input: property + date range + features
  2. Test prices from min_price to max_price
  3. For each price: predict booking probability
  4. Calculate expected_revenue for each price
  5. Return price with maximum expected revenue
- Response time target: <200ms per prediction

### Continuous Learning
- Retrain weekly (or when N new bookings collected)
- A/B test new models before full deployment
- Track model performance drift
- Archive model versions for rollback

---

## Frontend Pages/Components

### 1. Dashboard (Home)
- Property cards with key metrics
- Quick actions (sync, update prices)
- Recent activity feed
- Market overview for Kraków

### 2. Property Setup
- Multi-step form
- Property details input
- Platform connection wizard
- Amenities checklist
- Photo upload (optional for MVP)

### 3. Pricing Calendar
- Monthly calendar grid
- Hover tooltips showing algorithm breakdown
- Click to override price
- Visual indicators for bookings
- Export calendar feature

### 4. Algorithm Comparison
- Tabular comparison of all 5 algorithms
- **Revenue projection** for each algorithm (next 30 days)
- Expected occupancy rate
- Average nightly rate
- Total revenue = occupancy × rate × nights
- Historical performance (which algorithm generated most revenue)
- Apply button for each algorithm
- Blend option (weighted by historical performance)

### 5. Platform Connections
- Connection status cards
- OAuth flow integration
- Manual API key input fallback
- Test connection button
- Disconnect/reconnect options

### 6. Analytics
- Revenue chart (projected vs actual)
- **Revenue efficiency**: actual / theoretical maximum
- Occupancy rate over time
- **Revenue decomposition**: rate vs occupancy contribution
- Price elasticity curves
- Algorithm performance comparison (which maximizes revenue)
- Market position vs revenue outcome
- Download reports

---

## MVP Limitations & Simplifications

### Acceptable Simplifications
- Single user (no multi-tenancy for MVP)
- Desktop-only interface
- Mock competitor data if scraping takes too long
- Simple ML model (linear regression acceptable)
- Basic error handling
- No email notifications
- Manual sync only (skip automated background jobs if time-constrained)
- Single currency (PLN)

### Out of Scope for 24h
- User authentication system (use test user)
- Payment/billing
- Advanced analytics dashboards
- Mobile app or responsive design
- Multi-language support
- Detailed audit logs
- Rate limiting
- Advanced security features
- Automated testing suite

### Can Be Mocked
- Booking.com API (if credentials unavailable)
- Airbnb API (if credentials unavailable)
- Competition data (use pre-generated dataset)
- ML training data (synthetic is acceptable)

---

## Success Criteria for Demo

Must demonstrate:
1. ✅ Add a Kraków property with district selection
2. ✅ Generate prices using all 5 algorithms with revenue projections
3. ✅ Display 30-day pricing calendar with expected revenue per day
4. ✅ Show algorithm comparison with total monthly revenue estimates
5. ✅ Connect to at least one platform (or show mocked connection)
6. ✅ ML model provides predictions optimized for revenue maximization
7. ✅ Push price update to platform (or simulate)
8. ✅ Display revenue analytics showing which algorithm performs best
9. ✅ Show price elasticity curve (booking probability vs price)

---

## Demo Script (5 minutes)

**1. Problem Statement** (30s)
- Dynamic pricing is complex
- Manual pricing leaves money on table
- Generic tools don't understand Kraków market

**2. Solution Overview** (30s)
- Automated pricing with 5 algorithms
- Kraków-optimized with local knowledge
- Multi-platform support

**3. Live Demo** (3 min)
- Add property in Kazimierz district
- Show 5 different pricing algorithms with revenue projections
- Compare: Algorithm A predicts 8,500 PLN/month, Algorithm B predicts 9,200 PLN/month
- Highlight ML model finding optimal price point (not too high, not too low)
- Display price elasticity curve showing booking probability vs price
- Show calendar with revenue-optimized prices
- Simulate price push to Booking.com
- **Key metric**: "ML algorithm projects 23% higher monthly revenue than rule-based"

**4. Technology** (30s)
- Modern stack (Next.js, FastAPI)
- ML-powered intelligence
- Scalable architecture

**5. Future Vision** (30s)
- Expand to other Polish cities
- Advanced ML models
- Automated repricing
- Property management system integration

---

## Deployment

### Frontend (Vercel)
- Deploy Next.js application
- Configure environment variables
- Connect to backend API

### Backend (Railway/Render)
- Deploy FastAPI application
- PostgreSQL database setup
- Environment variables for API keys
- CORS configuration

### ML Model
- Include trained model file in deployment
- Load on server startup
- Versioning for model updates

---

## Post-Hackathon Roadmap

### Immediate Improvements
- Real-time competitor scraping
- Advanced ML models (LSTM, ensemble methods)
- Automated background sync
- User authentication
- Mobile responsive design

### Short-term (1-3 months)
- Multi-user support
- Email/SMS notifications
- A/B testing for pricing strategies
- Chrome extension for quick property addition
- Integration with property management systems

### Long-term Vision
- Expand to Warsaw, Wrocław, Gdańsk
- Revenue management consulting
- Market trend prediction
- White-label solution for agencies
- API for third-party integrations
- AI-powered demand forecasting

---

## Technical Architecture

### System Flow
1. User adds property → Store in database
2. Connect platforms → OAuth/API authentication
3. Fetch calendar data → Sync availability and booking history
4. Collect market data → Scrape competitor prices and occupancy
5. Run pricing algorithms → Generate revenue-optimized recommendations
6. Calculate expected revenue for each algorithm
7. User selects price (or auto-apply highest revenue algorithm)
8. Push to platforms
9. Track actual bookings → Feed back into ML model
10. Retrain models → Improve revenue predictions

### Data Flow
```
Frontend (Next.js)
  ↕ REST API
Backend (FastAPI)
  ↕
[SQLite] ← [ML Models (booking probability + revenue optimizer)]
  ↕
[Booking.com API] [Airbnb API] [Market Data Scraper]
```

### Key Design Decisions
- **REST over GraphQL**: Simpler for MVP, faster development
- **SQLite over PostgreSQL**: Zero configuration, perfect for MVP
- **Pickle for ML**: Simple serialization, fast loading
- **Revenue optimization objective**: Clear, measurable goal
- **Two-model ML approach**: Separates probability prediction from optimization
- **No hardcoded multipliers**: All learned from data
- **Server-side pricing**: Keep algorithms secure and centralized
- **Continuous learning**: Models improve as bookings accumulate

---

## Risk Mitigation

### High-Risk Items
1. **Platform API access** → Prepare mock data and simulated responses
2. **ML training time** → Use simple model or pre-trained weights
3. **Data collection** → Have synthetic dataset ready
4. **Integration complexity** → Build abstraction layer, can swap real/mock

### Contingency Plans
- APIs unavailable → Use mock mode with realistic data
- ML too complex → Use weighted average of other 4 algorithms
- Time runs short → Skip analytics, focus on core pricing flow
- Bugs in integration → Demo with one platform only

---

## What Makes This Kraków-Specific

1. **Market learning**: Continuously learns from Kraków market data, no assumptions
2. **District dynamics**: Discovers pricing patterns by district from actual data
3. **Event detection**: Scrapes Kraków event calendars and measures real impact
4. **Competition intelligence**: Real-time competitor analysis specific to Kraków properties
5. **Revenue optimization**: Finds sweet spot between occupancy and rate for Kraków market
6. **Local patterns**: ML model learns Kraków-specific booking behaviors

This gives competitive advantage over generic tools like PriceLabs that use:
- Global averages instead of Kraków data
- Hardcoded multipliers instead of learned patterns
- Single-objective optimization (just price) instead of revenue maximization

---

## Deliverables

- ✅ Deployed web application
- ✅ 5 functional pricing algorithms
- ✅ ML model trained on Kraków data
- ✅ Platform integrations (real or mocked)
- ✅ Pricing calendar and dashboard
- ✅ Demo video or live presentation
- ✅ GitHub repository
- ✅ README with setup instructions
- ✅ Architecture diagram
- ✅ Slide deck (5-10 slides)

**This plan is achievable in 24 hours with focused execution on core functionality. Good luck! 🚀**
