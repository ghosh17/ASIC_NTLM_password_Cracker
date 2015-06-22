
module Clock_Divider
(
  input wire clk,
  input wire n_rst,
  output wire clk_div
);

reg [2:0] count;
reg [2:0] next_cnt;
reg next_clk;
reg new_clk;

assign clk_div = new_clk;
always @ (posedge clk, negedge n_rst)
begin
  if(n_rst == 1'b0) begin
    count <= 3'd0;
    new_clk <= 1'b0;
  end
  else 
    begin
      count <= next_cnt;
      new_clk <= next_clk;
    end
  end 
  
always_comb begin
  next_clk <= new_clk;
  next_cnt <= count;
    if(count == 3'd4)
      begin 
        next_clk <= (!new_clk);
        next_cnt <= 3'd0;
      end
    else
      begin 
        next_clk <= new_clk;
        next_cnt <= count + 1; 
      end 
end


endmodule