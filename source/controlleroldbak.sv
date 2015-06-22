

module controller
  (
   input wire clk,
   input wire n_rst,
   input wire start_bit,
   input wire [0:8191] allthehashes,
   output reg [0:6] match,
   output reg [0:3] strlen,
   //output reg read_enable,
   output reg write_enable,
   output reg [0:9] address,
   input wire [0:127] read_data,
   output reg [0:127] write_data,
   input wire read_SRAM
   );
   reg [127:0] guess;
   reg [127:0] flip_guess;
   reg [127:0] outputhash;
   reg [127:0] outstr;
   reg [0:6] clocked_match;
   reg [0:127] clocked_str;
   reg [0:9] read_address;
   reg [0:9] read_next_address; 	
       
	 typedef enum {GENERATE, SRAM_WRITE, SRAM_READ} stateType;
   stateType state;
   stateType next_state;

   generate_guess GG(.clk(clk), .n_rst(n_rst), .start_bit(start_bit), .guess(guess), .flip_guess_out(flip_guess), .length(strlen));

   Compare CMP(.fucktonofhashes(allthehashes), .outputhash(outputhash), .match(match));

   Calculate_NTLM_reg NTLM(.clk(clk), .n_rst(n_rst), .instr(flip_guess), .length(strlen), .hash(outputhash), .outstr(outstr));
   
   always_ff @ (posedge clk, negedge n_rst) begin
    if (n_rst == 0) begin
      state <= GENERATE;
      clocked_match <= 0;
      clocked_str <= 0;
      read_address <= 0;
    end
    else begin
      state <= next_state;
      clocked_match <= match;
      clocked_str <= outstr;
      read_address <= read_next_address;
    end
  end
  always_comb begin
    next_state = state;
    read_next_address = read_address;
    case(state)
      GENERATE: begin
        if (read_SRAM == 1)next_state = SRAM_READ;
        else if (match != 64)next_state = SRAM_WRITE;
        else next_state = GENERATE;
        write_enable = 0;
        address = 0;
        write_data = 0;
      end
      SRAM_WRITE: begin
        next_state = GENERATE;
        write_enable = 1;
        address[0:5] = clocked_match[1:6];
        address[6:9] = 0;
        write_data = clocked_str;
      end
      /*default: begin
        if(start_bit_detected == 1)next_state = TIMER_ENABLE;
        else next_state = IDLE;
        sbc_clear = 0;
        sbc_enable = 0;
        load_buffer = 0;
        enable_timer = 0;
      end*/
      SRAM_READ: begin
        next_state = SRAM_READ;
        address = read_address;
        read_next_address = read_address + 16;
        
        if(address == 512)
          next_state = GENERATE;
      end
    /*
     // always @ (state, start_bit_detected, packet_done, framing_error) begin : State_Logic
      nextstate = state;
    
      case(state)
        IDLE: begin
          if(start_bit_detected == 1'b0) begin
            nextstate = IDLE;
          end else begin
            nextstate = READ;
          end
        end
      
        READ: begin
          if(packet_done == 1'b0) begin
            nextstate = READ;
          end else begin
            nextstate = SET;
          end
        end
      
        SET: begin
          nextstate = CHK;
        end
      
        CHK: begin
          if(framing_error == 1'b0) begin
            nextstate = LOAD;
          end else begin
            nextstate = IDLE;
          end
        end
      
        LOAD: begin
          nextstate = IDLE;
        end
      endcase
    //end
      */  
    endcase
  end

endmodule