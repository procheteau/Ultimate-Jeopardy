require 'rails_helper'

describe Game do
  it { should have_valid(:score).when(200) }
  it { should have_valid(:completed).when(false) }
end
