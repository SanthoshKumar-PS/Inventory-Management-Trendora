//Dashboard Page
export interface DashboardCardData {
  weeklyOrders: number;
  weeklyRevenue: number;
  outOfStock: number;
  processingOrders: number;
}

export interface DashboardResponse {
    message:string,
    cardData: DashboardCardData

}