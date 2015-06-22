`timescale 1ns / 10ps

module tb_tx_data();

	// Define parameters
	parameter CLK_PERIOD = 10;

	reg tb_clk;
	reg tb_n_rst;
	reg [7:0] tb_pwd;
	reg tb_passcrack;
	reg tb_tx_out;
	
	//Generate Clock Signal
	always
	begin : CLK_GEN
		tb_clk = 1'b0;
		#(CLK_PERIOD / 2);
		tb_clk = 1'b1;
		#(CLK_PERIOD / 2);
	end
	
	tx_data DUT
	(
		.clk(tb_clk),
		.n_rst(tb_n_rst),
		.pwd(tb_pwd),
		.passcrack(tb_passcrack),
		.tx_out(tb_tx_out)
	);
	
// 	begin
// 		// Send start bit
// 		tb_tx = 1'b0;
// 		#data_period;
// 		
// 		// Send data bits
// 		for(i = 0; i < 8; i = i + 1)
// 		begin
// 			tb_serial_in = data[i];
// 			#data_period;
// 		end
// 		
// 		// Send stop bit
// 		tb_serial_in = stop_bit;
// 		#data_period;
// 	end
// 	endtask

	initial
	begin 
	//initializations
	tb_n_rst = 1'b0;
	tb_pwd = 8'b00000000;
	tb_passcrack = 1'b0;
	
	@ (negedge tb_clk);
	
	//TestCase 1 Test if the passcrack is not read
	tb_pwd = 8'b10010110;
	tb_passcrack = 1'b0;
	tb_n_rst = 1'b1;
	
	@ (posedge tb_clk);
	#200ps; //This will check that the signals are updated and will allow for pro. delays
	
	@ (negedge tb_clk);
	tb_n_rst = 1'b1;
	@ (negedge tb_clk);
	
	//TestCase 2 Test if the passcrack is read
	tb_pwd = 8'b01010110;
	tb_n_rst = 1'b1;
	tb_passcrack = 1'b1;
	
	@ (negedge tb_clk);
	#(CLK_PERIOD*10); //This will check that the signals are updated and will allow for pro. delays
	
	@ (negedge tb_clk);	
	//TestCase 3 Test back to back reading
	tb_pwd = 8'b00000111;
	tb_n_rst = 1'b1;
	tb_passcrack = 1'b1;
	#(CLK_PERIOD*11)
	tb_passcrack = 1'b0;
	@ (posedge tb_clk);
// 	#200ps; //This will check that the signals are updated and will allow for pro. delays
// 	
// 	tb_passcrack = 1'b0;
// 	@(posedge tb_clk);
// 	#200ps;
  end
	
endmodule
