
`timescale 1ns / 10ps
module edge_detector
(
  input wire clk,
  input wire n_rst,
  input wire data_ready,
  output reg rising_edge_found,
  output reg falling_edge_found
);
  reg reg1out;
  reg reg2out;
  reg rising_edge_found_next;
  reg falling_edge_found_next;
  always_comb begin
    if(reg1out == 0 && reg2out == 1) falling_edge_found_next = 1;
    else falling_edge_found_next = 0;
    if(reg1out == 1 && reg2out == 0) rising_edge_found_next = 1;
    else rising_edge_found_next = 0;
  end
  always_ff @ (posedge clk, negedge n_rst) begin
    if (n_rst == 0) begin
      reg1out <= 0;
      reg2out <= 0;
      rising_edge_found <= 0;
      falling_edge_found <= 0;
    end
    else begin
      reg1out <= data_ready;
      reg2out <= reg1out;
      rising_edge_found <= rising_edge_found_next;
      falling_edge_found <= falling_edge_found_next;
    end
  end
endmodule